const colors = {
  base: '#1e1e2e',
  surface0: '#313244',
  surface1: '#45475a',
  surface2: '#585b70',
  text: '#cdd6f4',
  subtext0: '#a6adc8',
  subtext1: '#bac2de',
  blue: '#89b4fa',
  green: '#a6e3a1',
  red: '#f38ba8',
  yellow: '#f9e2af',
  peach: '#fab387',
  mauve: '#cba6f7'
};

const subnets = [
  {
    name: 'Subnet A',
    network: '192.168.1.0/24',
    mask: '255.255.255.0',
    accent: colors.blue,
    x: 30,
    y: 80,
    width: 280,
    height: 420
  },
  {
    name: 'Subnet B',
    network: '192.168.2.0/24',
    mask: '255.255.255.0',
    accent: colors.green,
    x: 490,
    y: 80,
    width: 280,
    height: 420
  }
];

const HOST_COLUMN_OFFSET = 140;
const HOST_TOP_PADDING = 100;
const HOST_VERTICAL_SPACING = 70;
const HOSTS_PER_SUBNET = 4;

const createHostYPositions = (subnetY) =>
  Array.from({ length: HOSTS_PER_SUBNET }, (_, index) => subnetY + HOST_TOP_PADDING + index * HOST_VERTICAL_SPACING);

const subnetHostCoords = {
  A: {
    x: subnets[0].x + HOST_COLUMN_OFFSET,
    ys: createHostYPositions(subnets[0].y),
    subnet: '192.168.1.0/24',
    gateway: '192.168.1.1'
  },
  B: {
    x: subnets[1].x + subnets[1].width - HOST_COLUMN_OFFSET,
    ys: createHostYPositions(subnets[1].y),
    subnet: '192.168.2.0/24',
    gateway: '192.168.2.1'
  }
};

const hosts = [
  ...['10', '11', '12', '13'].map((suffix, index) => ({
    ip: `192.168.1.${Number(suffix)}`,
    subnet: '192.168.1.0/24',
    subnetName: 'A',
    mask: '255.255.255.0',
    gateway: '192.168.1.1',
    x: subnetHostCoords.A.x,
    y: subnetHostCoords.A.ys[index],
    state: 'default'
  })),
  ...['10', '11', '12', '13'].map((suffix, index) => ({
    ip: `192.168.2.${Number(suffix)}`,
    subnet: '192.168.2.0/24',
    subnetName: 'B',
    mask: '255.255.255.0',
    gateway: '192.168.2.1',
    x: subnetHostCoords.B.x,
    y: subnetHostCoords.B.ys[index],
    state: 'default'
  }))
];

const PACKET_SPEED = 0.01;

const gatewayWidth = 140;
const gatewayHeight = 70;

const gatewayA = {
  name: 'Gateway A',
  lanIP: '192.168.1.1',
  wanIP: '10.0.0.1',
  x: 310,
  y: 270,
  wanPosition: { x: 340, y: 550 },
  routingTable: [
    { dest: '192.168.1.0/24', nextHop: 'directly connected', iface: '192.168.1.1' },
    { dest: '192.168.2.0/24', nextHop: '10.0.0.2', iface: '10.0.0.1' }
  ]
};

const gatewayB = {
  name: 'Gateway B',
  lanIP: '192.168.2.1',
  wanIP: '10.0.0.2',
  x: 490,
  y: 270,
  wanPosition: { x: 460, y: 550 },
  routingTable: [
    { dest: '192.168.2.0/24', nextHop: 'directly connected', iface: '192.168.2.1' },
    { dest: '192.168.1.0/24', nextHop: '10.0.0.1', iface: '10.0.0.2' }
  ]
};

const wanLink = {
  start: { x: 340, y: 550 },
  end: { x: 460, y: 550 },
  label: 'WAN: 10.0.0.0/30',
  endpoints: '10.0.0.1 ↔ 10.0.0.2'
};

const annotationEl = document.getElementById('annotation');
const sendButton = document.getElementById('send-packet-btn');
const gatewayATableBody = document.getElementById('gateway-a-table');
const gatewayBTableBody = document.getElementById('gateway-b-table');

const initialAnnotation = "Click 'Send Random Packet' to begin";

function populateRoutingTable(targetEl, rows) {
  if (!targetEl) return;
  targetEl.innerHTML = '';

  rows.forEach((entry) => {
    const row = document.createElement('tr');
    const dest = document.createElement('td');
    dest.textContent = entry.dest;
    const nextHop = document.createElement('td');
    nextHop.textContent = entry.nextHop;
    const iface = document.createElement('td');
    iface.textContent = entry.iface;
    row.append(dest, nextHop, iface);
    targetEl.appendChild(row);
  });
}

function renderRoutingTables() {
  populateRoutingTable(gatewayATableBody, gatewayA.routingTable);
  populateRoutingTable(gatewayBTableBody, gatewayB.routingTable);
}

const appState = {
  packet: null,
  path: [],
  animationState: 'idle',
  progress: 0,
  currentIndex: 0,
  pauseFrames: 0
};

let pInstance = null;

renderRoutingTables();

sendButton.addEventListener('click', () => {
  sendRandomPacket();
});

function setAnnotation(text) {
  annotationEl.textContent = text;
}

function resetHostStates() {
  hosts.forEach((host) => {
    host.state = 'default';
  });
}

function sendRandomPacket() {
  const pool = [...hosts];
  if (pool.length < 2) {
    return;
  }

  const srcIndex = Math.floor(Math.random() * pool.length);
  let dstIndex = Math.floor(Math.random() * pool.length);
  while (dstIndex === srcIndex) {
    dstIndex = Math.floor(Math.random() * pool.length);
  }

  const srcHost = pool[srcIndex];
  const dstHost = pool[dstIndex];

  resetHostStates();
  srcHost.state = 'source';
  dstHost.state = 'destination';

  const path = calculatePath(srcHost, dstHost);
  appState.packet = {
    srcIP: srcHost.ip,
    dstIP: dstHost.ip,
    ttl: 64,
    hops: 0,
    x: path[0].x,
    y: path[0].y,
    srcHost,
    dstHost
  };

  appState.path = path;
  appState.animationState = 'moving';
  appState.progress = 0;
  appState.currentIndex = 0;
  appState.pauseFrames = 0;

  if (srcHost.subnet === dstHost.subnet) {
    setAnnotation(`Same subnet (${srcHost.subnet}) - Direct delivery from ${srcHost.ip} → ${dstHost.ip}`);
  } else {
    setAnnotation(`Different subnets - ${srcHost.ip} (${srcHost.subnet}) → ${dstHost.ip} (${dstHost.subnet})`);
  }
}

function calculatePath(srcHost, dstHost) {
  const waypoints = [
    { x: srcHost.x, y: srcHost.y, label: srcHost.ip }
  ];

  const sameSubnet = srcHost.subnet === dstHost.subnet;

  if (sameSubnet) {
    waypoints.push({ x: dstHost.x, y: dstHost.y, label: dstHost.ip });
    return waypoints;
  }

  if (srcHost.subnetName === 'A') {
    waypoints.push({ x: gatewayA.x, y: gatewayA.y, label: 'Gateway A LAN', action: 'route', gateway: gatewayA });
    waypoints.push({ x: gatewayA.wanPosition.x, y: gatewayA.wanPosition.y, label: 'Gateway A WAN' });
    waypoints.push({ x: gatewayB.wanPosition.x, y: gatewayB.wanPosition.y, label: 'Gateway B WAN' });
    waypoints.push({ x: gatewayB.x, y: gatewayB.y, label: 'Gateway B LAN', action: 'route', gateway: gatewayB });
  } else {
    waypoints.push({ x: gatewayB.x, y: gatewayB.y, label: 'Gateway B LAN', action: 'route', gateway: gatewayB });
    waypoints.push({ x: gatewayB.wanPosition.x, y: gatewayB.wanPosition.y, label: 'Gateway B WAN' });
    waypoints.push({ x: gatewayA.wanPosition.x, y: gatewayA.wanPosition.y, label: 'Gateway A WAN' });
    waypoints.push({ x: gatewayA.x, y: gatewayA.y, label: 'Gateway A LAN', action: 'route', gateway: gatewayA });
  }

  waypoints.push({ x: dstHost.x, y: dstHost.y, label: dstHost.ip });
  return waypoints;
}

function updateAnimation() {
  if (!appState.packet || appState.path.length < 2 || !pInstance) {
    return;
  }

  if (appState.animationState === 'moving') {
    const start = appState.path[appState.currentIndex];
    const end = appState.path[appState.currentIndex + 1];
    appState.progress += PACKET_SPEED;
    const t = Math.min(appState.progress, 1);
    appState.packet.x = pInstance.lerp(start.x, end.x, t);
    appState.packet.y = pInstance.lerp(start.y, end.y, t);

    if (appState.progress >= 1) {
      appState.currentIndex += 1;
      appState.progress = 0;
      appState.packet.hops += 1;

      const arrivedWaypoint = appState.path[appState.currentIndex];

      if (appState.currentIndex >= appState.path.length - 1) {
        appState.animationState = 'completed';
        appState.packet.x = arrivedWaypoint.x;
        appState.packet.y = arrivedWaypoint.y;
        setAnnotation(`Packet delivered! Final TTL: ${appState.packet.ttl}, Hops: ${appState.packet.hops}`);
        return;
      }

      if (arrivedWaypoint.action === 'route' && arrivedWaypoint.gateway) {
        appState.animationState = 'gateway';
        appState.pauseFrames = 150;
        appState.packet.ttl = Math.max(0, appState.packet.ttl - 1);
        setAnnotation(`${arrivedWaypoint.gateway.name} routing decision - TTL decremented to ${appState.packet.ttl} (see tables below)`);
      }
    }
  } else if (appState.animationState === 'gateway') {
    appState.pauseFrames -= 1;
    if (appState.pauseFrames <= 0) {
      appState.animationState = 'moving';
    }
  }
}

const sketch = (p) => {
  pInstance = p;

  p.setup = () => {
    const canvas = p.createCanvas(800, 600);
    canvas.parent('canvas-container');
    p.textFont('Inter, "JetBrains Mono", monospace');
    p.textAlign(p.CENTER, p.CENTER);
    setAnnotation(initialAnnotation);
  };

  p.draw = () => {
    p.background(colors.base);
    updateAnimation();
    drawSubnets(p);
    drawWANLink(p);
    drawGateways(p);
    drawHosts(p);
    drawPacket(p);
  };
};

function drawSubnets(p) {
  subnets.forEach((subnet) => {
    const fillColor = p.color(colors.surface1);
    fillColor.setAlpha(140);
    p.fill(fillColor);
    p.stroke(subnet.accent);
    p.strokeWeight(2);
    p.rect(subnet.x, subnet.y, subnet.width, subnet.height, 10);

    p.noStroke();
    p.fill(colors.text);
    p.textAlign(p.LEFT, p.TOP);
    p.textSize(16);
    p.text(subnet.name, subnet.x + 16, subnet.y + 16);
    p.fill(colors.subtext0);
    p.textSize(13);
    p.text(subnet.network, subnet.x + 16, subnet.y + 40);
    p.text(subnet.mask, subnet.x + 16, subnet.y + 60);
  });
}

function drawHosts(p) {
  const screenWidth = 52;
  const screenHeight = 34;
  const innerPadding = 6;
  const standHeight = 6;
  const baseHeight = 6;

  hosts.forEach((host) => {
    let accentColor = colors.surface2;
    if (host.state === 'source') {
      accentColor = colors.green;
    } else if (host.state === 'destination') {
      accentColor = colors.blue;
    }

    const halfWidth = screenWidth / 2;
    const halfHeight = screenHeight / 2;

    // Outer monitor frame
    p.stroke(colors.text);
    p.strokeWeight(2);
    p.fill(accentColor);
    p.rect(host.x - halfWidth, host.y - halfHeight, screenWidth, screenHeight, 8);

    // Inner screen
    p.noStroke();
    p.fill(colors.base);
    p.rect(
      host.x - halfWidth + innerPadding,
      host.y - halfHeight + innerPadding,
      screenWidth - innerPadding * 2,
      screenHeight - innerPadding * 2,
      6
    );

    // Stand
    p.fill(colors.surface2);
    p.rect(host.x - 8, host.y + halfHeight - 4, 16, standHeight, 3);

    // Base
    p.rect(host.x - 18, host.y + halfHeight + standHeight - 2, 36, baseHeight, 3);

    // Label
    p.fill(colors.text);
    p.textAlign(p.CENTER, p.TOP);
    p.textSize(10);
    p.text(host.ip, host.x, host.y + halfHeight + standHeight + baseHeight + 4);
  });
}

function drawGateways(p) {
  [gatewayA, gatewayB].forEach((gateway) => {
    p.stroke(colors.peach);
    p.strokeWeight(2);
    p.fill(colors.surface2);
    p.rect(gateway.x - gatewayWidth / 2, gateway.y - gatewayHeight / 2, gatewayWidth, gatewayHeight, 8);

    p.fill(colors.text);
    p.noStroke();
    p.textAlign(p.CENTER, p.CENTER);
    p.textSize(13);
    p.text(gateway.name, gateway.x, gateway.y - 10);
    p.textSize(11);
    p.text(`LAN: ${gateway.lanIP}`, gateway.x, gateway.y + 8);
    p.text(`WAN: ${gateway.wanIP}`, gateway.x, gateway.y + 26);
  });
}

function drawWANLink(p) {
  p.stroke(colors.mauve);
  p.strokeWeight(4);
  p.line(wanLink.start.x, wanLink.start.y, wanLink.end.x, wanLink.end.y);

  p.noStroke();
  p.fill(colors.mauve);
  p.textAlign(p.CENTER, p.BOTTOM);
  p.textSize(11);
  p.text(wanLink.label, (wanLink.start.x + wanLink.end.x) / 2, wanLink.start.y - 14);
  p.fill(colors.subtext0);
  p.textSize(9);
  p.text(wanLink.endpoints, (wanLink.start.x + wanLink.end.x) / 2, wanLink.start.y - 2);
}

function drawPacket(p) {
  if (!appState.packet) {
    return;
  }

  p.stroke(colors.peach);
  p.strokeWeight(2);
  p.fill(colors.red);
  p.circle(appState.packet.x, appState.packet.y, 20);

  p.noStroke();
  p.fill(colors.text);
  p.textAlign(p.CENTER, p.BOTTOM);
  p.textSize(10);
  p.text(`${appState.packet.srcIP} → ${appState.packet.dstIP}`, appState.packet.x, appState.packet.y - 14);

  p.fill(colors.yellow);
  p.textAlign(p.CENTER, p.TOP);
  p.text(`TTL: ${appState.packet.ttl}`, appState.packet.x, appState.packet.y + 14);
}

new p5(sketch);
