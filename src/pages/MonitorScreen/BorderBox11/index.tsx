import React, { useMemo, useRef, forwardRef } from 'react';

import PropTypes from 'prop-types';

import classnames from 'classnames';

import { deepMerge } from '@jiaminghi/charts/lib/util/index';
import { deepClone } from '@jiaminghi/c-render/lib/plugin/util';
import { fade } from '@jiaminghi/color';

import { useAutoResize } from '@jiaminghi/data-view-react';

import { uuid } from '@base/utils';

import './index.less';

const defaultColor = ['#8aaafb', '#1f33a2'];

const BorderBox = forwardRef(
  (
    {
      children,
      className,
      style,
      color = [],
      titleWidth = 250,
      title = '',
      backgroundColor = 'transparent',
    }: any,
    ref,
  ) => {
    const filterId = useRef(`border-box-11-filterId-${uuid()}`).current;

    const { width, height, domRef } = useAutoResize(ref);

    const mergedColor = useMemo(
      () => deepMerge(deepClone(defaultColor, true), color || []),
      [color],
    );

    const classNames = useMemo(
      () => classnames('dv-border-box-11', className),
      [className],
    );

    return (
      <div className={classNames} style={style} ref={domRef}>
        <svg className="dv-border-svg-container" width={width} height={height}>
          <defs>
            <filter id={filterId} height="150%" width="150%" x="-25%" y="-25%">
              <feMorphology
                operator="dilate"
                radius="2"
                in="SourceAlpha"
                result="thicken"
              />
              <feGaussianBlur in="thicken" stdDeviation="3" result="blurred" />
              <feFlood floodColor={mergedColor[1]} result="glowColor" />
              <feComposite
                in="glowColor"
                in2="blurred"
                operator="in"
                result="softGlowColored"
              />
              <feMerge>
                <feMergeNode in="softGlowColored" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <polygon
            fill={backgroundColor}
            points={`
          20, 32 ${width * 0.5 - titleWidth / 2}, 32 ${
              width * 0.5 - titleWidth / 2 + 20
            }, 53
          ${width * 0.5 + titleWidth / 2 - 20}, 53 ${
              width * 0.5 + titleWidth / 2
            }, 32
          ${width - 20}, 32 ${width - 8}, 48 ${width - 8}, ${height - 25} ${
              width - 20
            }, ${height - 8}
          20, ${height - 8} 8, ${height - 25} 8, 50
        `}
          />

          <polyline
            stroke={mergedColor[0]}
            filter={`url(#${filterId})`}
            points={`
          ${(width - titleWidth) / 2}, 30
          20, 30 7, 50 7, ${50 + (height - 167) / 2}
          13, ${55 + (height - 167) / 2} 13, ${135 + (height - 167) / 2}
          7, ${140 + (height - 167) / 2} 7, ${height - 27}
          20, ${height - 7} ${width - 20}, ${height - 7} ${width - 7}, ${
              height - 27
            }
          ${width - 7}, ${140 + (height - 167) / 2} ${width - 13}, ${
              135 + (height - 167) / 2
            }
          ${width - 13}, ${55 + (height - 167) / 2} ${width - 7}, ${
              50 + (height - 167) / 2
            }
          ${width - 7}, 50 ${width - 20}, 30 ${(width + titleWidth) / 2}, 30
          ${(width + titleWidth) / 2 - 20}, 7 ${
              (width - titleWidth) / 2 + 20
            }, 7
          ${(width - titleWidth) / 2}, 30 ${(width - titleWidth) / 2 + 20}, 52
          ${(width + titleWidth) / 2 - 20}, 52 ${(width + titleWidth) / 2}, 30
        `}
          />

          <polygon
            stroke={mergedColor[0]}
            fill="transparent"
            points={`
          ${(width + titleWidth) / 2 - 5}, 30 ${
              (width + titleWidth) / 2 - 21
            }, 11
          ${(width + titleWidth) / 2 - 27}, 11 ${
              (width + titleWidth) / 2 - 8
            }, 34
        `}
          />

          <polygon
            stroke={mergedColor[0]}
            fill="transparent"
            points={`
          ${(width - titleWidth) / 2 + 5}, 30 ${
              (width - titleWidth) / 2 + 22
            }, 49
          ${(width - titleWidth) / 2 + 28}, 49 ${
              (width - titleWidth) / 2 + 8
            }, 26
        `}
          />

          <polygon
            stroke={mergedColor[0]}
            fill={fade(mergedColor[1] || defaultColor[1], 30)}
            filter={`url(#${filterId})`}
            points={`
          ${(width + titleWidth) / 2 - 11}, 37 ${
              (width + titleWidth) / 2 - 32
            }, 11
          ${(width - titleWidth) / 2 + 23}, 11 ${
              (width - titleWidth) / 2 + 11
            }, 23
          ${(width - titleWidth) / 2 + 33}, 49 ${
              (width + titleWidth) / 2 - 22
            }, 49
        `}
          />

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="1"
            points={`
          ${(width - titleWidth) / 2 - 10}, 37 ${
              (width - titleWidth) / 2 - 31
            }, 37
          ${(width - titleWidth) / 2 - 25}, 46 ${
              (width - titleWidth) / 2 - 4
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="0.7"
            points={`
          ${(width - titleWidth) / 2 - 40}, 37 ${
              (width - titleWidth) / 2 - 61
            }, 37
          ${(width - titleWidth) / 2 - 55}, 46 ${
              (width - titleWidth) / 2 - 34
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="0.7;0.4;0.7"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="0.5"
            points={`
          ${(width - titleWidth) / 2 - 70}, 37 ${
              (width - titleWidth) / 2 - 91
            }, 37
          ${(width - titleWidth) / 2 - 85}, 46 ${
              (width - titleWidth) / 2 - 64
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="0.5;0.2;0.5"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="1"
            points={`
          ${(width + titleWidth) / 2 + 30}, 37 ${
              (width + titleWidth) / 2 + 9
            }, 37
          ${(width + titleWidth) / 2 + 3}, 46 ${
              (width + titleWidth) / 2 + 24
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="1;0.7;1"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="0.7"
            points={`
          ${(width + titleWidth) / 2 + 60}, 37 ${
              (width + titleWidth) / 2 + 39
            }, 37
          ${(width + titleWidth) / 2 + 33}, 46 ${
              (width + titleWidth) / 2 + 54
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="0.7;0.4;0.7"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <polygon
            filter={`url(#${filterId})`}
            fill={mergedColor[0]}
            opacity="0.5"
            points={`
          ${(width + titleWidth) / 2 + 90}, 37 ${
              (width + titleWidth) / 2 + 69
            }, 37
          ${(width + titleWidth) / 2 + 63}, 46 ${
              (width + titleWidth) / 2 + 84
            }, 46
        `}
          >
            {/* <animate
              attributeName="opacity"
              values="0.5;0.2;0.5"
              dur="2s"
              begin="0s"
              repeatCount="indefinite"
            /> */}
          </polygon>

          <text
            className="dv-border-box-11-title"
            x={`${width / 2}`}
            y="32"
            fill="#fff"
            fontSize="18"
            textAnchor="middle"
            dominantBaseline="middle"
          >
            {title}
          </text>

          <polygon
            fill={mergedColor[0]}
            filter={`url(#${filterId})`}
            points={`
          7, ${53 + (height - 167) / 2} 11, ${57 + (height - 167) / 2}
          11, ${133 + (height - 167) / 2} 7, ${137 + (height - 167) / 2}
        `}
          />

          <polygon
            fill={mergedColor[0]}
            filter={`url(#${filterId})`}
            points={`
          ${width - 7}, ${53 + (height - 167) / 2} ${width - 11}, ${
              57 + (height - 167) / 2
            }
          ${width - 11}, ${133 + (height - 167) / 2} ${width - 7}, ${
              137 + (height - 167) / 2
            }
        `}
          />
        </svg>

        <div className="border-box-content">{children}</div>
      </div>
    );
  },
);

BorderBox.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  style: PropTypes.object,
  color: PropTypes.array,
  titleWidth: PropTypes.number,
  title: PropTypes.string,
  backgroundColor: PropTypes.string,
};

export default BorderBox;
