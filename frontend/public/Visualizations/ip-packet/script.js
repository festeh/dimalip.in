// Field information data
const fieldInfo = {
    'version': {
        title: 'Version',
        description: 'Specifies the IP version being used. For IPv4, this value is always 4. This field allows routers and devices to correctly interpret the packet format. IPv6 uses version 6.',
        examples: [
            ['4', 'IPv4', 'Standard Internet Protocol version 4'],
            ['6', 'IPv6', 'Internet Protocol version 6 (uses different header format)']
        ]
    },
    'ihl': {
        title: 'IHL (Internet Header Length)',
        description: 'Indicates the length of the IP header in 32-bit words. The minimum value is 5 (20 bytes) for a header without options. Maximum is 15 (60 bytes). Multiply by 4 to get the actual byte length.',
        examples: [
            ['5', '20 bytes', 'Standard header with no options (most common)'],
            ['6', '24 bytes', 'Header with 4 bytes of options'],
            ['7', '28 bytes', 'Header with 8 bytes of options'],
            ['15', '60 bytes', 'Maximum header size with 40 bytes of options']
        ]
    },
    'tos': {
        title: 'Type of Service (TOS)',
        description: 'Originally designed for Quality of Service (QoS) to prioritize packets. Modern implementations use this as the DSCP (Differentiated Services Code Point) field for traffic classification and priority handling.',
        examples: [
            ['0x00', 'Default', 'Normal priority, best-effort delivery'],
            ['0x10', 'Minimize delay', 'Low latency for interactive traffic'],
            ['0x08', 'Maximize throughput', 'Bulk data transfer'],
            ['0xB8', 'EF (Expedited)', 'Highest priority (VoIP, real-time traffic)'],
            ['0x28', 'AF11', 'Assured Forwarding class 1, low drop probability']
        ]
    },
    'total-length': {
        title: 'Total Length',
        description: 'The entire packet size in bytes, including header and data. Minimum is 20 bytes (header only), maximum is 65,535 bytes. This field helps determine where the packet ends and is used to extract the payload.',
        examples: [
            ['20', 'Header only', 'No data payload (unusual)'],
            ['40', 'Small packet', 'Typical for ACK packets (20-byte header + 20-byte TCP header)'],
            ['1500', 'Standard MTU', 'Maximum size for Ethernet without fragmentation'],
            ['576', 'Safe minimum', 'Smallest MTU all hosts must support'],
            ['65535', 'Maximum', 'Theoretical maximum packet size']
        ]
    },
    'identification': {
        title: 'Identification',
        description: 'A unique identifier for a group of fragments belonging to a single IP datagram. When a packet is fragmented, all fragments share the same identification value so the receiver can reassemble them correctly.',
        examples: [
            ['0x0000', 'Zero', 'Often used when DF flag is set (no fragmentation)'],
            ['0x1A2B', 'Random value', 'Unique ID assigned by sender'],
            ['Sequential', 'Incrementing', 'Some systems increment for each packet'],
            ['Per-destination', 'Flow-based', 'Different sequences for different destinations']
        ]
    },
    'flags': {
        title: 'Flags',
        description: 'Three control bits for packet fragmentation. Bit 0 is reserved (must be 0), Bit 1 is "Don\'t Fragment" (DF), and Bit 2 is "More Fragments" (MF). The DF flag is commonly used for Path MTU Discovery.',
        examples: [
            ['Bit 0', 'Reserved', 'Must always be 0'],
            ['Bit 1: DF=1', 'Don\'t Fragment', 'Prevents fragmentation, used by TCP for MTU discovery'],
            ['Bit 2: MF=1', 'More Fragments', 'Indicates more fragments follow this one'],
            ['0x2 (DF=1)', 'Normal TCP', 'Most common for modern TCP traffic'],
            ['0x0', 'Allow fragment', 'Packet can be fragmented if needed']
        ]
    },
    'fragment-offset': {
        title: 'Fragment Offset',
        description: 'Specifies the position of this fragment in the original packet, measured in 8-byte units. Combined with the More Fragments flag, this allows the receiver to reassemble fragments in the correct order.',
        examples: [
            ['0', 'First fragment', 'Beginning of packet or unfragmented packet'],
            ['185', '1480 bytes offset', 'Second fragment of standard MTU packet (185 × 8 = 1480)'],
            ['370', '2960 bytes offset', 'Third fragment in sequence'],
            ['Non-zero + MF=0', 'Last fragment', 'Final piece of fragmented packet']
        ]
    },
    'ttl': {
        title: 'Time to Live (TTL)',
        description: 'Limits the packet\'s lifetime by counting router hops. Each router decrements TTL by 1; when it reaches 0, the packet is discarded and an ICMP "Time Exceeded" message is sent back. This prevents infinite routing loops.',
        examples: [
            ['64', 'Linux/Unix default', 'Standard for most Linux and Unix systems'],
            ['128', 'Windows default', 'Standard for Windows operating systems'],
            ['255', 'Maximum', 'Some network devices or manually configured'],
            ['30-60', 'Partially traveled', 'Packet has crossed several routers'],
            ['1', 'About to expire', 'Next hop will drop packet and send ICMP error']
        ]
    },
    'protocol': {
        title: 'Protocol',
        description: 'Identifies which protocol is used in the data portion of the IP packet. This tells the receiving system how to interpret and process the payload. Common values include TCP (6), UDP (17), and ICMP (1).',
        examples: [
            ['1', 'ICMP', 'Used for ping, traceroute, network diagnostics'],
            ['6', 'TCP', 'Reliable connection-oriented traffic (HTTP, SSH, etc.)'],
            ['17', 'UDP', 'Fast connectionless traffic (DNS, streaming, gaming)'],
            ['41', 'IPv6', 'IPv6 encapsulated in IPv4 (tunneling)'],
            ['50', 'ESP', 'Encrypted IPsec traffic']
        ]
    },
    'checksum': {
        title: 'Header Checksum',
        description: 'Error-detection field calculated over the IP header only (not the data). Routers recalculate this at each hop since TTL changes. If the checksum doesn\'t match, the packet is discarded.',
        examples: [
            ['0x0000', 'Valid calculation', 'Checksum algorithm may result in zero'],
            ['0x3F4A', 'Example value', 'Typical checksum for this packet header'],
            ['Recalculated', 'At each hop', 'Changes as TTL decrements'],
            ['Mismatch', 'Packet dropped', 'Indicates corruption in transmission'],
            ['Offloaded', 'NIC handles it', 'Modern NICs calculate checksum in hardware']
        ]
    },
    'source-ip': {
        title: 'Source IP Address',
        description: 'The 32-bit IPv4 address of the sender. This address allows the receiver to know where the packet came from and where to send replies. It can be a private address (behind NAT) or a public Internet address.',
        examples: [
            ['192.168.x.x', 'Private network', 'Local network, behind NAT/router'],
            ['10.x.x.x', 'Private Class A', 'Large private networks'],
            ['172.16-31.x.x', 'Private Class B', 'Medium private networks'],
            ['8.8.8.8', 'Public address', 'Google DNS (example public IP)'],
            ['127.0.0.1', 'Localhost', 'Loopback address (same machine)']
        ]
    },
    'dest-ip': {
        title: 'Destination IP Address',
        description: 'The 32-bit IPv4 address of the intended recipient. Routers use this address to make forwarding decisions and determine the next hop. This is the primary field used in routing tables.',
        examples: [
            ['192.168.x.x', 'Local network', 'Destination on same private network'],
            ['8.8.8.8', 'Google DNS', 'Public DNS server'],
            ['93.184.216.34', 'example.com', 'Example public website'],
            ['255.255.255.255', 'Broadcast', 'Send to all hosts on local network'],
            ['224.0.0.0-239.x.x.x', 'Multicast', 'Send to multicast group']
        ]
    },
    'options': {
        title: 'Options & Padding',
        description: 'Optional header fields used for network testing, debugging, and special routing. Rarely used in modern networks due to processing overhead and security concerns. Padding ensures the header ends on a 32-bit boundary.',
        examples: [
            ['None (IHL=5)', 'Most common', 'Modern traffic typically has no options'],
            ['Record Route', 'Debug tool', 'Records IP addresses of routers traversed'],
            ['Timestamp', 'Timing info', 'Records timestamps at each router'],
            ['Source Routing', 'Path control', 'Sender specifies route (security risk)'],
            ['Padding', 'Alignment', 'Zeros added to reach 32-bit boundary']
        ]
    }
};

// Initialize the visualization
let selectedField = null;

function updateInfoPanel(fieldKey) {
    const info = fieldInfo[fieldKey];
    if (!info) return;

    // Update title and description
    document.getElementById('field-title').textContent = info.title;
    document.getElementById('field-description').textContent = info.description;

    // Update examples table
    const examplesTable = document.getElementById('field-examples');
    examplesTable.innerHTML = '';

    info.examples.forEach(([value, label, description]) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="value-col">${value}</td>
            <td class="protocol-col">${label}</td>
            <td>${description}</td>
        `;
        examplesTable.appendChild(row);
    });
}

function selectField(fieldElement) {
    // Remove previous selection
    if (selectedField) {
        selectedField.classList.remove('selected');
    }

    // Add new selection
    fieldElement.classList.add('selected');
    selectedField = fieldElement;

    // Update info panel
    const fieldKey = fieldElement.getAttribute('data-field');
    updateInfoPanel(fieldKey);
}

// Set up click handlers
document.addEventListener('DOMContentLoaded', () => {
    const fields = document.querySelectorAll('.field');

    fields.forEach(field => {
        field.addEventListener('click', () => {
            selectField(field);
        });
    });

    // Select the Protocol field by default
    const protocolField = document.querySelector('[data-field="protocol"]');
    if (protocolField) {
        selectField(protocolField);
    }
});
