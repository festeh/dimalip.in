# IPv4 Layer 3 Interactive Visualization Specification v2.0

## 1. Overview

A simplified educational p5.js visualization demonstrating IPv4 Layer 3 (Network Layer) routing concepts. The visualization shows how packets travel between hosts in the same or different subnets through gateways, with a focus on visual clarity using Catppuccin dark theme colors.

**Changes from v1:**
- Removed IPv4 packet structure panel
- Applied Catppuccin Mocha (dark) color scheme
- Streamlined interface focusing on routing visualization
- TTL display moved to packet label

---

## 2. Color Scheme - Catppuccin Mocha (Dark)

```javascript
const colors = {
  base: '#1e1e2e',           // Main background
  surface0: '#313244',        // Elevated surfaces
  surface1: '#45475a',        // More elevated surfaces
  surface2: '#585b70',        // Even more elevated
  text: '#cdd6f4',           // Primary text
  subtext0: '#a6adc8',       // Secondary text
  subtext1: '#bac2de',       // Tertiary text
  blue: '#89b4fa',           // Subnet A accent
  green: '#a6e3a1',          // Subnet B accent
  red: '#f38ba8',            // Packet fill
  yellow: '#f9e2af',         // Gateway borders, TTL
  peach: '#fab387',          // Gateway fill
  mauve: '#cba6f7',          // WAN link
  teal: '#94e2d5',
  sky: '#89dceb',
  lavender: '#b4befe'
};
```

---

## 3. Network Topology

### 3.1 Subnet A (Left Side)
- **Network Address**: 192.168.1.0/24
- **Subnet Mask**: 255.255.255.0
- **Gateway**: 192.168.1.1 (LAN interface)
- **Hosts**: 4 hosts with addresses:
  - 192.168.1.10
  - 192.168.1.11
  - 192.168.1.12
  - 192.168.1.13
- **Visual**: Blue accent border, surface1 background

### 3.2 Subnet B (Right Side)
- **Network Address**: 192.168.2.0/24
- **Subnet Mask**: 255.255.255.0
- **Gateway**: 192.168.2.1 (LAN interface)
- **Hosts**: 4 hosts with addresses:
  - 192.168.2.10
  - 192.168.2.11
  - 192.168.2.12
  - 192.168.2.13
- **Visual**: Green accent border, surface1 background

### 3.3 Gateway A
- **LAN Interface**: 192.168.1.1/24 (facing Subnet A)
- **WAN Interface**: 10.0.0.1/30 (facing Gateway B)
- **Function**: Routes packets between Subnet A and WAN
- **Visual**: Peach fill, yellow border

### 3.4 Gateway B
- **WAN Interface**: 10.0.0.2/30 (facing Gateway A)
- **LAN Interface**: 192.168.2.1/24 (facing Subnet B)
- **Function**: Routes packets between WAN and Subnet B
- **Visual**: Peach fill, yellow border

### 3.5 WAN Link
- **Network**: 10.0.0.0/30
- **Endpoints**: 10.0.0.1 ↔ 10.0.0.2
- **Visual**: Mauve line connecting Gateway A and Gateway B

---

## 4. Visual Layout

### 4.1 Canvas Dimensions
- **Size**: 1200px × 700px
- **Background**: Catppuccin base (#1e1e2e)

### 4.2 Component Positions

```
┌──────────────────┐                    ┌──────────────────┐
│   Subnet A       │                    │   Subnet B       │
│  192.168.1.0/24  │                    │  192.168.2.0/24  │
│   (Blue border)  │                    │  (Green border)  │
│                  │                    │                  │
│  [Host .10]      │                    │  [Host .10]      │
│  [Host .11]      │                    │  [Host .11]      │
│  [Host .12]      │                    │  [Host .12]      │
│  [Host .13]      │                    │  [Host .13]      │
│                  │                    │                  │
│  [Gateway A]     │                    │  [Gateway B]     │
│   192.168.1.1    │                    │   192.168.2.1    │
│   (Peach box)    │                    │   (Peach box)    │
└────────┬─────────┘                    └─────────┬────────┘
         │   10.0.0.1  ←────────────→  10.0.0.2 │
         └────────────────────────────────────────┘
                  WAN Link (Mauve)
                   10.0.0.0/30
```

**Coordinates:**
- Subnet A: x=50, y=150, width=350, height=300
- Subnet B: x=800, y=150, width=350, height=300
- Hosts (Subnet A): x=150, y=[200, 260, 320, 380]
- Hosts (Subnet B): x=1050, y=[200, 260, 320, 380]
- Gateway A: x=380, y=290
- Gateway B: x=820, y=290

---

## 5. Visual Elements

### 5.1 Subnets
- **Box**: Rounded rectangle (10px radius)
- **Fill**: surface1 color with 50% transparency
- **Border**: 2px stroke (blue for A, green for B)
- **Labels**:
  - Title: 16px bold, text color
  - Network address: 13px, subtext0 color
  - Subnet mask: 13px, subtext0 color

### 5.2 Hosts
- **Shape**: Rounded rectangle (5px radius)
- **Size**: 50px × 30px
- **Fill Colors**:
  - Default: surface2
  - Source (when sending): green
  - Destination (when receiving): blue
- **Border**: 2px, text color
- **Label**: IP address below host, 11px, text color, centered

### 5.3 Gateways
- **Shape**: Rounded rectangle (5px radius)
- **Size**: 160px × 80px
- **Fill**: peach
- **Border**: 2px, yellow
- **Labels** (all centered, base color text):
  - Gateway name: 13px bold
  - LAN IP: 11px
  - WAN IP: 11px

### 5.4 WAN Link
- **Line**: 3px stroke, mauve color
- **Label** (centered above line):
  - "WAN: 10.0.0.0/30": 12px, mauve
  - "10.0.0.1 ←→ 10.0.0.2": 10px, subtext0

### 5.5 Packet
- **Shape**: Circle
- **Size**: 20px diameter
- **Fill**: red
- **Border**: 2px, peach
- **Labels**:
  - Above packet: "srcIP → dstIP", 10px, text color, centered
  - Below packet: "TTL: XX", 10px, yellow color, centered
- **Animation**: Smooth interpolation between waypoints at 0.02 speed

---

## 6. User Interface

### 6.1 Control Panel (Top)
- **Background**: base color
- **Title**: "IPv4 Layer 3 Network Visualization", text color
- **Subtitle**: "Interactive demonstration of packet routing between subnets", subtext0 color
- **Button**: "Send Random Packet"
  - Fill: blue
  - Text: base color, bold
  - Border radius: 5px
  - Padding: 12px × 24px
  - Shadow: 0 2px 4px rgba(0,0,0,0.3)

### 6.2 Annotation Box
- **Position**: Below button, centered
- **Width**: Max 900px
- **Background**: surface0
- **Border**: 2px solid yellow
- **Text**: 14px, text color
- **Padding**: 10px
- **Border radius**: 5px
- **Content**: Real-time status messages about packet journey

### 6.3 Routing Table Modal
**Trigger**: Automatically appears when packet reaches a gateway

**Style:**
- **Overlay**: rgba(0,0,0,0.7) full screen
- **Modal box**:
  - Background: surface0
  - Border: 2px solid peach
  - Border radius: 10px
  - Max width: 700px
  - Padding: 30px
  - Shadow: 0 4px 6px rgba(0,0,0,0.5)

**Title**: Gateway name + " - Routing Table", peach color, 15px margin bottom

**Table:**
- Headers: surface1 background, text color, 12px padding
- Rows: Alternating surface0/surface1 backgrounds
- Columns:
  1. Destination Network (monospace, text color)
  2. Next Hop (monospace, subtext0 color)
  3. Interface (monospace, blue color)
- Border bottom: 1px solid surface2

**Close Button:**
- Background: peach
- Text: base color, bold
- Padding: 10px × 20px
- Border radius: 5px
- Margin top: 20px

---

## 7. Interactivity & Behavior

### 7.1 Send Random Packet
**Action:**
1. Randomly select 2 different hosts (can be from same or different subnets)
2. Create packet object with:
   - Source IP
   - Destination IP
   - Initial TTL = 64
3. Calculate routing path
4. Start animation
5. Update annotation with scenario description

### 7.2 Packet Animation States

**State: 'idle'**
- No packet visible
- Waiting for user to click button

**State: 'moving'**
- Packet interpolates between current and next waypoint
- Progress: 0.02 per frame
- When waypoint reached:
  - If next waypoint is gateway → transition to 'gateway' state
  - If end of path → transition to 'completed' state

**State: 'gateway'**
- Pause for 120 frames (2 seconds)
- Display routing table modal
- Decrement TTL by 1
- Update annotation
- After pause → return to 'moving' state

**State: 'completed'**
- Packet at destination
- Display final statistics in annotation
- Highlight destination host in blue

### 7.3 Routing Logic

**Same Subnet Scenario:**
```
Path: Source Host → Destination Host (direct)
Steps: 1
TTL changes: 0
Annotation: "Same subnet (192.168.X.0/24) - Direct delivery from A → B"
```

**Different Subnet Scenario (A to B):**
```
Path:
1. Source Host (Subnet A)
2. Gateway A LAN interface
3. Gateway A WAN interface
4. Gateway B WAN interface
5. Gateway B LAN interface
6. Destination Host (Subnet B)

Gateway stops: 2 (Gateway A and Gateway B)
TTL changes: -2 (decrements at each gateway)
Final TTL: 62
```

**Different Subnet Scenario (B to A):**
```
Path: Mirror of above, starting from Subnet B
```

---

## 8. Routing Tables

### 8.1 Gateway A Routing Table
```
┌──────────────────┬────────────────────┬─────────────┐
│ Destination      │ Next Hop           │ Interface   │
├──────────────────┼────────────────────┼─────────────┤
│ 192.168.1.0/24   │ directly connected │ 192.168.1.1 │
│ 192.168.2.0/24   │ 10.0.0.2           │ 10.0.0.1    │
│ 0.0.0.0/0        │ 10.0.0.2           │ 10.0.0.1    │
└──────────────────┴────────────────────┴─────────────┘
```

### 8.2 Gateway B Routing Table
```
┌──────────────────┬────────────────────┬─────────────┐
│ Destination      │ Next Hop           │ Interface   │
├──────────────────┼────────────────────┼─────────────┤
│ 192.168.2.0/24   │ directly connected │ 192.168.2.1 │
│ 192.168.1.0/24   │ 10.0.0.1           │ 10.0.0.2    │
│ 0.0.0.0/0        │ 10.0.0.1           │ 10.0.0.2    │
└──────────────────┴────────────────────┴─────────────┘
```

---

## 9. Annotation Messages

### 9.1 Initial State
```
"Click 'Send Random Packet' to begin"
```

### 9.2 Same Subnet
```
"Same subnet (192.168.X.0/24) - Direct delivery from [srcIP] → [dstIP]"
```

### 9.3 Different Subnets (Start)
```
"Different subnets - [srcIP] (192.168.X.0/24) → [dstIP] (192.168.Y.0/24)"
```

### 9.4 At Gateway
```
"[Gateway Name] routing decision - TTL decremented to [XX]"
```

### 9.5 Completion
```
"Packet delivered! Final TTL: [XX], Hops: [N]"
```

---

## 10. Technical Implementation

### 10.1 Data Structures

```javascript
// Host object
const host = {
  ip: "192.168.1.10",
  subnet: "192.168.1.0",
  mask: "255.255.255.0",
  gateway: "192.168.1.1",
  x: 150,
  y: 200,
  subnetName: "A"  // "A" or "B"
};

// Gateway object
const gateway = {
  name: "Gateway A",
  lanIP: "192.168.1.1",
  lanMask: "255.255.255.0",
  wanIP: "10.0.0.1",
  wanMask: "255.255.255.252",
  x: 380,
  y: 290,
  routingTable: [
    { dest: "192.168.1.0/24", nextHop: "directly connected", iface: "192.168.1.1" },
    { dest: "192.168.2.0/24", nextHop: "10.0.0.2", iface: "10.0.0.1" },
    { dest: "0.0.0.0/0", nextHop: "10.0.0.2", iface: "10.0.0.1" }
  ]
};

// Packet object
const packet = {
  srcIP: "192.168.1.10",
  dstIP: "192.168.2.13",
  srcHost: hostObject,
  dstHost: hostObject,
  ttl: 64,
  x: 150,
  y: 200
};

// Path waypoint
const waypoint = {
  x: 380,
  y: 290,
  label: "Gateway A LAN (192.168.1.1)",
  gateway: gatewayObject,  // Optional: present if this is a gateway stop
  action: "route"          // Optional: "route" if gateway should process
};
```

### 10.2 Key Functions

```javascript
// Setup network topology
function setupNetwork() {
  // Create 4 hosts in Subnet A
  // Create 4 hosts in Subnet B
  // Create Gateway A
  // Create Gateway B
}

// Send random packet
function sendRandomPacket() {
  // Select 2 random different hosts
  // Create packet object
  // Calculate path
  // Initialize animation
  // Set annotation
}

// Calculate routing path
function calculatePath(srcHost, dstHost) {
  // Check if same subnet
  // If yes: direct path
  // If no: path through gateways
  // Return array of waypoints
}

// Draw functions
function drawSubnets() { }
function drawHosts() { }
function drawGateways() { }
function drawWANLink() { }
function drawPacket() { }

// Main draw loop
function draw() {
  background(colors.base);
  drawSubnets();
  drawWANLink();
  drawGateways();
  drawHosts();
  drawPacket();
}
```

### 10.3 Animation Controller

```javascript
let animationState = 'idle';  // 'idle', 'moving', 'gateway', 'completed'
let animationProgress = 0;     // 0 to 1
let currentPathIndex = 0;      // Current waypoint index
let pauseTime = 0;             // Frames to pause at gateway

// In draw loop
if (animationState === 'moving') {
  animationProgress += 0.02;
  packet.x = lerp(start.x, end.x, animationProgress);
  packet.y = lerp(start.y, end.y, animationProgress);
  
  if (animationProgress >= 1) {
    currentPathIndex++;
    animationProgress = 0;
    
    if (nextWaypoint.action === 'route') {
      animationState = 'gateway';
      pauseTime = 120;
      packet.ttl--;
      showRoutingTable = nextWaypoint.gateway;
    }
  }
}
else if (animationState === 'gateway') {
  pauseTime--;
  if (pauseTime <= 0) {
    animationState = 'moving';
    showRoutingTable = null;
  }
}
```

---

## 11. Educational Value

### 11.1 Key Learning Objectives

Students will understand:
1. **Subnet boundaries**: How subnet masks determine local vs remote networks
2. **Default gateway role**: When and why hosts forward to gateways
3. **Routing decisions**: How gateways use routing tables to forward packets
4. **TTL mechanism**: How TTL prevents infinite loops in networks
5. **Multi-hop routing**: Packets traverse multiple devices to reach destination
6. **Direct delivery**: Same-subnet hosts communicate without router

### 11.2 Visual Feedback

- **Color coding**: Immediate identification of source (green) and destination (blue)
- **Animated movement**: Packet's journey is visible and trackable
- **Gateway pauses**: Emphasize routing decision points
- **Routing tables**: Show exact lookup process at each gateway
- **Status annotations**: Explain what's happening in plain language
- **TTL counter**: Shows hop count in real-time

---

## 12. Accessibility & UX

### 12.1 Color Contrast
- Text on dark backgrounds: High contrast (WCAG AA compliant)
- Accent colors: Distinct and vibrant for visibility
- Hover states: N/A (no hover interactions in simplified version)

### 12.2 Typography
- Monospace for IPs and routing table: Improved readability
- Appropriate font sizes: 10-16px range
- Bold for emphasis: Gateway names, titles

### 12.3 User Feedback
- Immediate visual response to button click
- Continuous status updates in annotation box
- Modal automatically appears at key decision points
- Clear packet tracking with labels

---

## 13. Future Enhancements (Out of Scope for v2)

- IPv4 packet header visualization (separate panel or toggle)
- Multiple simultaneous packets
- User-configurable network topology
- Step-through mode (manual hop advancement)
- Speed control slider
- Packet loss simulation
- ARP resolution visualization
- ICMP error messages (TTL exceeded)
- Path MTU discovery
- Network congestion visualization
- Statistics dashboard (total packets, average hops, etc.)
- Export/save network configurations

---

## 14. Implementation Checklist

**Phase 1: Setup**
- [x] Initialize p5.js canvas (1200×700)
- [x] Define Catppuccin color palette
- [x] Create host data structures (8 hosts)
- [x] Create gateway data structures (2 gateways)
- [x] Position all network elements

**Phase 2: Static Rendering**
- [x] Draw subnet boxes with labels
- [x] Draw hosts with IP labels
- [x] Draw gateways with interface labels
- [x] Draw WAN link with labels
- [x] Apply Catppuccin colors throughout

**Phase 3: UI Components**
- [x] Create "Send Packet" button
- [x] Create annotation box
- [x] Create routing table modal
- [x] Apply dark theme styling

**Phase 4: Logic**
- [x] Implement random host selection
- [x] Implement path calculation (same/different subnet)
- [x] Create routing table data structures
- [x] Implement packet object creation

**Phase 5: Animation**
- [x] Implement packet movement interpolation
- [x] Add animation state machine
- [x] Implement gateway pauses
- [x] Add TTL decrement logic
- [x] Add host highlighting (source/destination)

**Phase 6: Integration**
- [x] Connect button to sendRandomPacket()
- [x] Update annotations dynamically
- [x] Show/hide routing table modal
- [x] Display TTL with packet

**Phase 7: Polish**
- [x] Test both routing scenarios
- [x] Verify color consistency
- [x] Check all text labels
- [x] Smooth animation timing
- [x] Test modal interactions

---

## 15. Success Criteria

The visualization successfully demonstrates Layer 3 concepts when:

1. ✅ Users can clearly see the difference between same-subnet and cross-subnet routing
2. ✅ Gateway routing decisions are visible and understandable
3. ✅ TTL mechanism is demonstrated with each hop
4. ✅ Routing tables show the lookup process
5. ✅ Packet path is smooth and easy to follow
6. ✅ Status messages explain what's happening in real-time
7. ✅ Dark theme is consistent and readable
8. ✅ Interface is intuitive with single button interaction

---

## 16. Known Limitations

- No packet header details (removed in v2 for simplicity)
- Fixed network topology (no user editing)
- Single packet at a time (no concurrent packets)
- No packet loss or error conditions
- No Layer 2 (MAC/ARP) visualization
- No fragmentation demonstration
- No support for VLANs or more complex topologies

---

## 17. Files

```
ipv4-visualization.html   - Standalone HTML page with control panel and canvas
ipv4-visualization.css    - Stylesheet implementing Catppuccin Mocha theme
ipv4-visualization.js     - p5.js sketch, data model, and animation logic
ipv4-visualization-spec-v2.md - This specification document
```

---

**Specification Version**: 2.0  
**Last Updated**: 2024  
**Status**: Implemented ✅

---

**End of Specification**
