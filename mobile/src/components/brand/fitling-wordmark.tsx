import Svg, { Defs, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

const VIEW_W = 300;
const VIEW_H = 108;
const BASELINE = 78;
const FONT_SIZE = 76;

/**
 * The "Fitling" sticker wordmark: an orange gradient fill wrapped in a dark
 * outline and then a thick cream sticker border, with a heart dotting the "i".
 *
 * Built by stacking the same text three times — widest stroke at the back —
 * because `paint-order` isn't supported in react-native-svg.
 */
export function FitlingWordmark({ width = 260 }: { width?: number }) {
  const height = (width / VIEW_W) * VIEW_H;
  const common = {
    x: VIEW_W / 2,
    y: BASELINE,
    fontSize: FONT_SIZE,
    fontFamily: 'Fredoka_600SemiBold',
    textAnchor: 'middle' as const,
  };

  return (
    <Svg width={width} height={height} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}>
      <Defs>
        <LinearGradient id="fitlingFill" x1="0" y1="0" x2="0" y2="1">
          <Stop offset="0" stopColor="#FFB347" />
          <Stop offset="0.45" stopColor="#FC9016" />
          <Stop offset="1" stopColor="#F26F05" />
        </LinearGradient>
      </Defs>

      <SvgText {...common} fill="none" stroke="#FFF6E8" strokeWidth={26} strokeLinejoin="round">
        Fitling
      </SvgText>
      <SvgText {...common} fill="none" stroke="#5A2D0C" strokeWidth={13} strokeLinejoin="round">
        Fitling
      </SvgText>
      <SvgText {...common} fill="url(#fitlingFill)">
        Fitling
      </SvgText>

      {/* Nestles into the gap above the "i", standing in for its dot. */}
      <Path
        d="M0 13C-14 3-15.5-8-7.8-11.4-3.3-13.4 0-11 0-7.8 0-11 3.3-13.4 7.8-11.4 15.5-8 14 3 0 13z"
        transform="translate(96 16)"
        fill="#FFF6E8"
        stroke="#5A2D0C"
        strokeWidth={3.4}
        strokeLinejoin="round"
      />
    </Svg>
  );
}
