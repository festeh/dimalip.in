# IPv4 Packet Structure Visualization Specification

## 1. Concept & Learning Goals

**What is being taught:**
- The structure of an IPv4 packet header and how data is organized at the network layer
- The purpose and function of each header field
- Common values and their practical implications in real-world networking

**Learning outcomes:**
- Developers can identify and understand each field in an IPv4 header
- Understand why specific fields exist and how they're used in practice
- Recognize common field values and what they indicate (e.g., Protocol 6 = TCP, TTL 64 = Linux default)
- Grasp the relationship between fields (e.g., IHL indicates header length including Options)

**Key insights:**
- The header is organized in 32-bit rows for efficient processing
- Some fields are rarely changed (Version), while others vary per packet (Identification)
- Certain field combinations reveal information about the packet's purpose and origin

## 2. Visual Design

**Layout:**
- **Left side (60-65% width)**: Main packet diagram showing the complete IPv4 header structure
- **Right side (35-40% width)**: Information panel displaying details about the selected field
- **Top**: Title "IPv4 Packet Structure" with brief subtitle

**Spatial Organization:**

*Main Diagram (Left):*
- Title area at top
- Bit position ruler showing 0-31 across the top of the diagram
- Header fields displayed as horizontal rows, each 32 bits wide
- Fields spanning multiple bits shown as merged cells (e.g., Version = 4 bits, IHL = 4 bits in first row)
- Rows stacked vertically in standard IPv4 header order
- Each field labeled with its name and example value

*Information Panel (Right):*
- Field name as header
- "What it does" section with brief explanation
- "Common Examples" section with table or list of values and use cases
- Visual separation between sections

**Visual Elements:**

*Packet Diagram:*
- **Bit position markers**: Numbers 0-31 displayed above the diagram, aligned with bit boundaries
- **Field boundaries**: Clear vertical lines separating fields at bit boundaries
- **Field cells**: Rectangular boxes containing:
  - Field name (e.g., "Version", "Total Length")
  - Example value (e.g., "4", "0x002E (46 bytes)")
  - Bit range indicator if helpful (e.g., "bits 0-3")
- **Color coding**: Subtle background colors to group related fields or improve readability
  - Keep colors muted/professional
  - Highlight selected field with distinct color (e.g., light blue border or background)
- **Row structure** (top to bottom):
  1. Version (4 bits) | IHL (4 bits) | Type of Service (8 bits) | Total Length (16 bits)
  2. Identification (16 bits) | Flags (3 bits) | Fragment Offset (13 bits)
  3. Time to Live (8 bits) | Protocol (8 bits) | Header Checksum (16 bits)
  4. Source IP Address (32 bits)
  5. Destination IP Address (32 bits)
  6. Options (variable) | Padding (variable) - shown as one combined area

*Information Panel:*
- **Selected field header**: Bold, larger text showing the field name
- **Explanation section**: 2-4 sentences describing purpose and importance
- **Examples section**: Formatted list or table showing:
  - Value | Meaning | Use Case
  - 3-5 common examples per field
- **Visual polish**: Subtle background, good spacing, readable typography

**Example values for default display (Generic HTTP request):**
- Version: 4
- IHL: 5 (20 bytes, no options)
- Type of Service: 0x00 (default)
- Total Length: 0x002E (46 bytes - 20 byte header + 26 byte payload example)
- Identification: 0x1A2B (example ID)
- Flags: 0x02 (Don't Fragment set)
- Fragment Offset: 0
- TTL: 64
- Protocol: 6 (TCP)
- Header Checksum: 0x3F4A (example)
- Source IP: 192.168.1.100
- Destination IP: 93.184.216.34 (example.com)
- Options: (empty/none)
- Padding: (none needed when no options)

## 3. Interactive Controls

**Primary Interaction:**
- **Click on any field**: Clicking a field in the packet diagram updates the right panel to show information about that field
- **Visual feedback**: Clicked field is highlighted with a border or background color change
- **No other controls**: No sliders, buttons, or input fields needed - keep it simple and focused

**Click targets:**
- Each field box in the diagram is clickable
- Clear hover state (cursor changes to pointer, subtle highlight) to indicate clickability

## 4. Animation & Behavior

**On page load:**
- Display complete IPv4 packet diagram with example values
- Right panel shows information for a default field (suggest "Protocol" or "Version" as a good starting point)
- Default field has initial highlight/selection visual state

**On field click:**
- Previously selected field returns to normal visual state
- Newly clicked field highlights (border or background change)
- Right panel content updates immediately to show:
  - Clicked field's name
  - "What it does" explanation
  - "Common Examples" table
- Transition should be instant (no animation needed - keep it snappy for reference use)

**Hover behavior:**
- Mouse cursor changes to pointer over clickable fields
- Subtle hover effect (e.g., light border or background tint) to indicate interactivity
- Does not change the right panel content - only click does that

**No reset needed:**
- Visualization maintains state - whatever field is selected stays selected
- Users can click different fields to explore

## 5. Educational Features

**Field Information Content:**

For each field, the right panel should include:

1. **What it does (2-4 sentences):**
   - Brief explanation of the field's purpose
   - Why it matters in practical networking
   - When/how it's used

2. **Common Examples (3-5 per field):**

*Example for "Protocol" field:*
- **Value: 1** | **ICMP** | Used for ping, traceroute, network diagnostics
- **Value: 6** | **TCP** | Reliable connection-oriented traffic (HTTP, SSH, etc.)
- **Value: 17** | **UDP** | Fast connectionless traffic (DNS, streaming, gaming)
- **Value: 41** | **IPv6** | IPv6 encapsulated in IPv4 (tunneling)
- **Value: 50** | **ESP** | Encrypted IPsec traffic

*Example for "TTL" field:*
- **Value: 64** | **Linux/Unix default** | Common for Linux systems
- **Value: 128** | **Windows default** | Common for Windows systems
- **Value: 255** | **Maximum** | Some network devices, or manually set
- **Value: 30-60** | **Partially traveled** | Packet has crossed several routers
- **Value: 1** | **About to expire** | Next hop will drop it

*Example for "Flags" field:*
- **Bit 0: Reserved** | **Must be 0** | Not used
- **Bit 1: DF (Don't Fragment)** | **Path MTU Discovery** | Prevents fragmentation, used by TCP
- **Bit 2: MF (More Fragments)** | **Fragmented packet** | Indicates more fragments follow
- **DF=1, MF=0** | **Normal modern traffic** | Most common for TCP
- **DF=0, MF=1** | **Fragment in sequence** | Large packet split up

**Visual aids in the panel:**
- Use monospace font for values (e.g., "0x00", "192.168.1.1")
- Use bold or color to highlight key terms
- Keep examples concise - one line per example

**Progressive understanding:**
- Start with commonly clicked fields (Protocol, Source/Dest IP)
- More technical fields (Header Checksum, Fragment Offset) provide deeper detail when user explores
- Options field explanation notes it's rarely used in modern networking but shows what it's for

**Helpful notes to include:**
- For IHL: Note that it's measured in 32-bit words, so 5 = 20 bytes
- For Total Length: Note it includes header + data, max 65,535 bytes
- For Options: Note that most modern traffic doesn't use this, contributing to IHL=5
- For Header Checksum: Brief note that it's recalculated at each hop as TTL changes
