const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.4,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function Svg({ size = 24, children, ...rest }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...base} {...rest}>
      {children}
    </svg>
  );
}

export function IconFlor(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="2.6" />
      <path d="M12 9.4c-1.4-1.4-1.4-3.6 0-5 1.4 1.4 1.4 3.6 0 5Z" />
      <path d="M12 14.6c1.4 1.4 1.4 3.6 0 5-1.4-1.4-1.4-3.6 0-5Z" />
      <path d="M9.4 12c-1.4 1.4-3.6 1.4-5 0 1.4-1.4 3.6-1.4 5 0Z" />
      <path d="M14.6 12c1.4-1.4 3.6-1.4 5 0-1.4 1.4-3.6 1.4-5 0Z" />
    </Svg>
  );
}

export function IconEnvelope(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.2" />
      <path d="m4 7 8 6 8-6" />
    </Svg>
  );
}

export function IconCamera(props) {
  return (
    <Svg {...props}>
      <path d="M4 8.5c0-.8.7-1.5 1.5-1.5H8l1.2-1.7A1.5 1.5 0 0 1 10.4 4.6h3.2c.5 0 .9.2 1.2.7L16 6.7v.3h2.5c.8 0 1.5.7 1.5 1.5V17c0 .8-.7 1.5-1.5 1.5h-13A1.5 1.5 0 0 1 4 17V8.5Z" />
      <circle cx="12" cy="12.5" r="3.4" />
    </Svg>
  );
}

export function IconPin(props) {
  return (
    <Svg {...props}>
      <path d="M12 21s-6.5-6.1-6.5-11A6.5 6.5 0 0 1 18.5 10c0 4.9-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </Svg>
  );
}

export function IconPencil(props) {
  return (
    <Svg {...props}>
      <path d="M4 20l.9-3.6L15.4 6l2.6 2.6L7.6 19.1 4 20Z" />
      <path d="m13.6 7.8 2.6 2.6" />
    </Svg>
  );
}

export function IconLeaf(props) {
  return (
    <Svg {...props}>
      <path d="M6 20C5 13 8.5 6.5 18 5c1 8-4 13.5-12 15Z" />
      <path d="M6.5 19.5c2-3 4.6-5.6 8.7-9.3" />
    </Svg>
  );
}

export function IconLock(props) {
  return (
    <Svg {...props}>
      <rect x="5.5" y="10.5" width="13" height="9" rx="2" />
      <path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" />
    </Svg>
  );
}

export function IconHeart(props) {
  return (
    <Svg {...props}>
      <path d="M12 19.2s-7-4.4-7-9.7A4 4 0 0 1 12 6.3 4 4 0 0 1 19 9.5c0 5.3-7 9.7-7 9.7Z" />
    </Svg>
  );
}

export function IconCheck(props) {
  return (
    <Svg {...props}>
      <path d="m5 12.5 4.5 4.5L19 7" />
    </Svg>
  );
}

export function IconSparkle(props) {
  return (
    <Svg {...props}>
      <path d="M12 4v4M12 16v4M4 12h4M16 12h4M6.5 6.5l2.6 2.6M14.9 14.9l2.6 2.6M17.5 6.5l-2.6 2.6M9.1 14.9l-2.6 2.6" />
    </Svg>
  );
}

export function IconBook(props) {
  return (
    <Svg {...props}>
      <path d="M4 5.2C4 4.5 4.6 4 5.2 4H11a1 1 0 0 1 1 1v15L5.2 20A1.2 1.2 0 0 1 4 18.8V5.2Z" />
      <path d="M20 5.2c0-.7-.6-1.2-1.2-1.2H13a1 1 0 0 0-1 1v15l6.8 0a1.2 1.2 0 0 0 1.2-1.2V5.2Z" />
    </Svg>
  );
}
