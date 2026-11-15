import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';

const operatingRegions = {
  WA: {
    id: 'WA',
    name: 'Washington',
    code: 'WA',
    markets: ['Seattle', 'Tacoma'],
  },
  OR: {
    id: 'OR',
    name: 'Oregon',
    code: 'OR',
    markets: ['Portland', 'Salem', 'Beaverton'],
  },
  CA: {
    id: 'CA',
    name: 'California',
    code: 'CA',
    markets: ['Los Angeles', 'San Diego'],
  },
  AZ: {
    id: 'AZ',
    name: 'Arizona',
    code: 'AZ',
    markets: ['Phoenix', 'Tucson'],
  },
  KS: {
    id: 'KS',
    name: 'Kansas',
    code: 'KS',
    markets: ['Kansas City', 'Overland Park'],
  },
  MO: {
    id: 'MO',
    name: 'Missouri',
    code: 'MO',
    markets: ['Kansas City', 'St. Louis'],
  },
  KY: {
    id: 'KY',
    name: 'Kentucky',
    code: 'KY',
    markets: ['Covington'],
  },
  OH: {
    id: 'OH',
    name: 'Ohio',
    code: 'OH',
    markets: ['Cincinnati', 'Columbus', 'Dayton'],
  },
  PA: {
    id: 'PA',
    name: 'Pennsylvania',
    code: 'PA',
    markets: ['Harrisburg', 'Allentown', 'Pittsburgh', 'Easton'],
  },
  FL: {
    id: 'FL',
    name: 'Florida',
    code: 'FL',
    markets: ['Palm Beach'],
  },
};

/* ─── Accurate Contiguous US State Vector Polygons & Label Coordinates ────── */
const US_STATES = [
  { code: 'WA', lx: 185, ly: 113, d: 'M160,73L235,88L228,132L229,139L227,142L201,137L179,139L169,139L166,136L161,135L148,135L146,125L132,118L136,112L133,109L135,106L132,103L132,91L129,86L130,81L132,80L155,92L146,101L149,103L147,107L153,108L159,103L159,96L163,92L160,84L162,78L159,74Z' },
  { code: 'OR', lx: 170, ly: 176, d: 'M134,122L143,124L146,128L146,135L152,138L159,136L165,137L168,140L200,138L226,142L233,148L233,152L219,172L223,177L220,183L216,215L213,217L139,204L111,198L109,196L111,186L110,180L120,166L119,163L130,134L130,126L133,123Z' },
  { code: 'CA', lx: 160, ly: 315, d: 'M111,199L169,210L171,212L161,268L230,355L235,369L239,373L231,379L231,385L227,390L226,395L230,400L228,402L212,401L188,400L185,396L184,386L169,371L168,367L161,366L151,356L138,353L138,340L135,338L136,335L130,328L128,321L123,314L126,302L118,295L119,287L124,292L125,291L122,284L122,281L125,279L122,276L118,281L115,278L114,272L105,258L107,240L102,231L102,226L108,220L108,214L111,209L110,200Z' },
  { code: 'ID', lx: 257, ly: 192, d: 'M237,87L248,90L246,108L250,114L249,118L260,133L266,137L261,155L264,158L269,155L271,157L275,167L274,169L280,175L282,181L285,179L302,180L305,177L308,182L304,228L288,227L216,217L221,184L224,178L221,171L235,151L229,141L229,132L236,88Z' },
  { code: 'NV', lx: 213, ly: 268, d: 'M173,211L257,224L259,226L246,326L243,339L237,335L233,338L234,354L232,356L162,268L172,212Z' },
  { code: 'MT', lx: 333, ly: 140, d: 'M250,90L327,99L412,104L411,174L408,178L310,171L308,179L305,176L301,179L282,179L280,173L276,170L272,155L269,154L264,157L262,154L265,150L264,145L267,135L260,131L251,118L251,113L247,107L249,91Z' },
  { code: 'WY', lx: 357, ly: 218, d: 'M311,173L409,179L408,251L405,255L304,248L303,240L310,174Z' },
  { code: 'UT', lx: 289, ly: 285, d: 'M261,225L301,229L303,231L303,249L330,251L332,253L326,326L321,328L252,321L248,319L260,226Z' },
  { code: 'AZ', lx: 279, ly: 382, d: 'M249,321L325,330L317,436L313,439L282,436L224,406L231,400L228,395L228,390L232,385L233,379L240,373L233,360L235,355L234,339L236,337L239,337L242,340L245,338L248,322Z' },
  { code: 'CO', lx: 383, ly: 296, d: 'M334,252L436,257L437,312L436,333L433,334L327,328L333,253Z' },
  { code: 'NM', lx: 369, ly: 386, d: 'M327,330L417,334L421,336L419,349L417,431L404,431L358,429L356,433L332,432L329,440L320,440L317,438L326,331Z' },
  { code: 'ND', lx: 462, ly: 137, d: 'M415,104L505,105L508,110L508,121L512,130L513,148L517,157L516,161L510,161L413,160L414,105Z' },
  { code: 'SD', lx: 465, ly: 194, d: 'M413,161L516,162L517,163L513,168L519,173L520,206L518,208L518,213L520,217L518,221L517,223L509,219L497,221L491,217L411,217L410,193L412,162Z' },
  { code: 'NE', lx: 471, ly: 250, d: 'M411,218L492,219L498,223L508,220L516,224L522,228L522,233L529,248L531,262L538,273L524,275L439,275L438,256L408,254L410,219Z' },
  { code: 'KS', lx: 493, ly: 308, d: 'M527,275L540,275L545,279L543,284L551,292L552,332L520,334L458,334L437,333L439,276L526,276Z' },
  { code: 'OK', lx: 512, ly: 366, d: 'M549,333L553,334L558,366L557,397L547,392L544,394L534,394L530,397L519,393L511,396L507,393L504,395L499,390L487,390L483,389L479,384L474,385L469,381L469,351L468,344L422,343L423,335L548,334Z' },
  { code: 'TX', lx: 485, ly: 446, d: 'M422,344L467,345L468,382L475,387L480,386L482,390L492,392L498,391L502,396L513,396L515,399L519,395L529,399L535,395L545,395L547,393L552,397L566,401L567,430L571,434L571,438L577,447L577,452L574,458L575,467L571,472L572,474L565,478L560,478L558,474L555,476L553,475L555,483L544,495L537,497L527,496L526,498L528,502L524,501L524,505L517,508L518,512L511,514L515,517L515,520L511,523L509,522L507,525L513,527L511,530L513,542L517,549L515,552L510,549L501,549L486,542L479,530L478,520L464,505L456,487L443,475L439,476L429,473L421,478L414,491L409,489L391,476L389,471L390,467L386,459L366,441L363,435L358,431L418,432L421,345Z' },
  { code: 'MN', lx: 548, ly: 162, d: 'M536,97L539,98L541,107L544,109L550,109L555,112L560,109L566,109L574,116L577,113L584,118L589,118L593,115L597,117L605,115L609,118L597,124L577,144L577,155L569,164L573,168L572,181L583,187L590,194L593,194L596,199L595,203L584,204L535,207L521,206L520,173L514,168L518,163L518,156L514,148L515,143L513,129L509,121L508,106L511,104L534,104L535,98Z' },
  { code: 'IA', lx: 565, ly: 235, d: 'M590,204L597,205L600,217L605,219L615,230L613,238L602,244L605,251L603,256L597,262L594,259L541,262L534,263L532,261L531,249L527,237L523,232L523,227L519,222L521,218L519,209L589,205Z' },
  { code: 'MO', lx: 585, ly: 308, d: 'M584,260L593,260L597,264L600,277L611,286L613,292L620,292L618,304L632,315L635,326L640,328L640,332L633,336L633,344L629,347L623,346L627,342L624,337L589,340L554,341L552,291L545,284L547,277L541,275L534,265L539,263L583,261Z' },
  { code: 'AR', lx: 590, ly: 375, d: 'M620,338L624,338L626,341L622,347L630,348L632,350L629,352L627,359L628,363L620,374L621,378L613,388L614,391L612,397L614,399L614,406L573,410L568,410L567,406L567,400L559,397L559,365L555,344L563,342L619,339Z' },
  { code: 'LA', lx: 597, ly: 448, d: 'M605,408L614,408L614,415L618,420L616,424L617,426L612,431L611,439L608,442L609,447L641,446L640,453L644,458L640,459L634,457L631,463L635,465L640,463L646,468L643,471L643,474L635,474L638,476L637,482L633,477L630,478L628,482L622,481L618,473L614,475L608,470L602,472L601,476L594,476L585,472L575,472L578,446L568,429L567,412L575,410L604,409Z' },
  { code: 'WI', lx: 614, ly: 186, d: 'M596,138L598,139L596,143L597,145L602,144L609,149L620,150L627,153L636,153L642,158L641,163L646,169L643,171L641,179L642,180L648,173L650,174L645,203L648,217L639,218L615,221L608,221L606,218L602,218L599,213L600,207L597,204L596,196L589,192L585,187L573,181L574,167L570,164L572,160L579,155L578,146L595,139Z' },
  { code: 'IL', lx: 633, ly: 268, d: 'M639,219L648,219L655,233L659,270L658,283L661,290L655,300L654,314L649,318L649,323L641,321L639,324L636,324L632,313L619,304L622,292L616,289L614,291L612,289L612,285L601,276L598,265L606,251L603,244L612,241L616,234L615,228L610,223L616,221L638,220Z' },
  { code: 'MS', lx: 639, ly: 415, d: 'M658,364L660,366L660,427L664,454L655,454L646,459L641,452L642,445L632,445L612,447L610,445L613,431L616,429L620,421L616,415L616,404L613,394L619,381L622,379L621,374L628,367L657,365Z' },
  { code: 'MI', lx: 696, ly: 204, d: 'M626,131L630,134L631,138L635,135L640,135L647,141L654,142L657,142L664,136L676,133L679,134L680,138L687,138L689,136L694,143L693,144L686,144L684,147L676,144L672,146L671,148L664,149L661,153L659,151L655,154L653,152L647,164L643,161L643,157L637,152L627,152L608,147L607,143L612,139L623,135L625,132Z M686,150L706,158L705,162L709,167L709,173L706,176L706,179L702,182L702,187L707,189L711,183L717,179L721,183L726,197L726,203L722,205L715,223L702,226L675,229L668,228L672,218L672,206L666,195L667,190L665,185L668,180L667,174L671,168L676,171L678,170L678,161L685,157L681,155L685,151Z' },
  { code: 'IN', lx: 679, ly: 268, d: 'M692,227L695,228L696,232L701,283L693,286L694,289L687,297L686,301L680,298L677,304L674,302L669,306L661,305L656,305L656,301L662,291L659,282L660,270L656,235L668,230L691,228Z' },
  { code: 'OH', lx: 729, ly: 254, d: 'M757,213L762,237L760,239L762,244L760,257L754,264L752,263L748,270L743,274L742,284L739,285L732,280L728,283L713,282L710,277L706,277L702,275L696,229L710,225L718,225L721,226L722,229L731,229L738,225L742,225L750,217L756,214Z' },
  { code: 'KY', lx: 704, ly: 312, d: 'M707,277L713,283L716,282L720,285L723,283L729,284L732,281L738,286L738,292L748,302L746,306L734,319L724,324L668,330L658,330L656,334L641,336L640,324L642,322L650,324L650,318L656,315L655,311L660,307L662,308L666,306L670,308L674,304L677,306L681,300L687,302L688,298L695,290L694,287L701,285L704,282L702,279L706,278Z' },
  { code: 'TN', lx: 686, ly: 347, d: 'M755,319L757,322L754,327L744,331L732,343L728,343L720,352L719,356L636,366L629,366L628,361L631,356L630,353L634,349L633,346L637,337L658,335L659,331L717,326L754,320Z' },
  { code: 'AL', lx: 687, ly: 408, d: 'M692,360L699,360L701,362L711,397L717,407L716,422L720,434L717,436L678,440L677,444L681,448L681,452L678,454L677,455L673,451L671,446L668,454L665,452L664,447L661,427L661,365L664,363L691,361Z' },
  { code: 'GA', lx: 741, ly: 404, d: 'M735,354L738,355L738,361L743,364L745,363L767,386L772,388L775,395L779,398L780,403L785,406L780,412L780,421L778,424L779,431L772,431L770,433L770,439L768,437L746,438L732,440L723,439L717,421L719,410L713,399L701,361L702,359L707,358L734,355Z' },
  { code: 'FL', lx: 788, ly: 492, d: 'M773,432L779,433L782,437L787,451L798,466L797,469L799,474L809,488L812,494L811,496L815,498L818,504L819,522L817,533L811,537L805,534L798,525L795,525L790,521L787,513L784,512L784,506L777,506L775,504L772,498L775,491L773,488L767,486L768,473L764,466L759,465L747,453L740,450L735,451L728,458L720,461L716,456L717,455L713,452L713,449L707,452L702,447L698,447L694,450L687,447L683,451L678,442L717,436L720,436L723,441L757,438L767,438L771,441L772,433Z' },
  { code: 'SC', lx: 780, ly: 370, d: 'M771,345L776,347L778,351L796,348L815,362L807,373L807,380L804,381L801,386L798,386L798,390L791,394L787,394L785,396L786,401L786,403L783,404L773,387L758,374L753,372L746,362L738,359L742,353L751,348L770,346Z' },
  { code: 'NC', lx: 800, ly: 334, d: 'M844,303L848,306L845,307L840,314L838,313L837,316L840,317L847,314L848,319L851,322L849,325L841,323L841,325L837,327L843,329L840,335L842,338L834,343L831,342L832,346L825,355L826,358L824,360L816,361L796,347L779,350L772,344L756,346L750,347L740,353L722,356L721,352L724,351L729,344L732,344L740,338L744,333L746,334L751,329L753,330L759,323L759,319L843,304Z' },
  { code: 'VA', lx: 798, ly: 296, d: 'M810,255L813,259L821,262L818,267L818,272L823,272L822,275L836,285L835,289L831,286L830,287L833,290L828,290L826,292L832,293L838,298L845,296L846,301L803,311L780,314L736,322L733,321L750,303L753,306L758,307L767,304L773,299L774,300L778,295L777,292L783,277L790,276L791,270L798,264L801,256L807,259L809,256Z' },
  { code: 'WV', lx: 764, ly: 282, d: 'M763,247L766,256L780,253L783,263L792,254L799,254L799,260L794,267L791,268L789,275L782,275L779,287L776,291L775,298L757,306L746,299L739,291L739,287L744,282L744,275L747,276L749,274L749,269L761,258L762,248Z' },
  { code: 'PA', lx: 801, ly: 229, d: 'M833,197L844,207L840,215L842,217L841,223L849,229L844,236L832,242L769,254L765,252L759,212L767,206L769,210L773,210L832,198Z' },
  { code: 'MD', lx: 818, ly: 252, small: true, d: 'M833,242L838,243L834,245L834,248L828,253L831,263L830,268L834,272L829,273L824,269L821,271L820,269L824,261L822,259L815,259L813,255L814,252L820,252L819,245L832,243Z' },
  { code: 'DE', lx: 860, ly: 260, outside: true, d: 'M840,238L841,246L851,258L851,262L847,264L845,264L842,259L838,244L839,239Z' },
  { code: 'NJ', lx: 868, ly: 235, outside: true, d: 'M846,207L858,212L855,222L861,224L860,237L857,240L854,249L844,246L841,242L851,230L842,221L842,214L845,208Z' },
  { code: 'NY', lx: 830, ly: 182, d: 'M845,135L848,136L853,160L857,162L860,176L859,189L863,205L861,209L860,210L857,205L856,209L842,205L839,202L839,199L834,196L800,203L770,209L769,205L779,193L779,190L775,185L783,180L805,179L815,170L815,161L811,159L815,156L821,145L828,139L844,136Z' },
  { code: 'CT', lx: 870, ly: 198, small: true, d: 'M867,188L870,190L878,190L879,199L871,202L865,207L864,206L861,190L866,189Z' },
  { code: 'RI', lx: 897, ly: 205, outside: true, d: 'M879,188L885,186L887,195L880,198Z' },
  { code: 'MA', lx: 875, ly: 182, small: true, d: 'M893,165L896,168L893,175L895,177L898,176L904,183L897,189L895,185L894,186L889,182L884,173L879,181L878,173L888,170L892,166Z M867,174L870,175L870,178L872,178L874,182L877,177L880,182L885,179L886,182L880,184L861,189L861,177L866,175Z' },
  { code: 'VT', lx: 861, ly: 149, small: true, d: 'M871,128L874,129L873,133L875,136L869,142L870,152L868,158L870,172L861,175L860,172L858,162L854,158L849,135L870,129Z' },
  { code: 'NH', lx: 879, ly: 162, small: true, d: 'M876,122L880,125L889,152L888,156L894,161L888,169L881,170L875,172L870,170L871,166L869,157L871,152L871,142L876,137L874,132L875,123Z' },
  { code: 'ME', lx: 903, ly: 114, d: 'M907,72L914,76L921,100L926,101L928,106L935,110L934,112L936,115L917,127L915,124L912,127L912,135L903,137L898,149L894,159L890,154L880,122L885,117L883,114L887,107L887,90L893,75L894,74L900,78L906,73Z' },
];

export default function PlacesWeOperate() {
  const [activeRegionId, setActiveRegionId] = useState('PA');
  const activeRegion = operatingRegions[activeRegionId] || operatingRegions.PA;

  return (
    <div className="w-full my-8 pt-6 sm:my-14 sm:pt-10 border-t border-slate-200 select-none">
      {/* ── Section Header (Apple Minimalist) ── */}
      <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 px-4">
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800 border border-slate-200 text-xs font-bold uppercase tracking-wider mb-2.5 shadow-xs">
          <Navigation className="w-3.5 h-3.5 text-[#0063ce]" />
          <span>Nationwide Service Footprint</span>
        </div>
        <h3
          style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
          className="text-2xl sm:text-4xl md:text-5xl font-medium text-black tracking-tight"
        >
          Places We Operate
        </h3>
        <p className="mt-2 text-xs sm:text-base text-slate-600 font-normal max-w-xl mx-auto">
          Active student transit corridors across 10 key states and growing. Tap any state to explore local service hubs.
        </p>
      </div>

      {/* ── Option 2: Frameless Minimalist Canvas (Apple / Stripe Style) ── */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* ── Frameless Contiguous US Map ── */}
        <div className="w-full aspect-[880/515] relative flex items-center justify-center">
          <svg
            viewBox="85 55 870 515"
            className="w-full h-full select-none"
            style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.03))' }}
          >
            {/* 1. State Polygons */}
            <g stroke="#ffffff" strokeWidth="1.8" strokeLinejoin="round">
              {US_STATES.map((st) => {
                const isOperating = Boolean(operatingRegions[st.code]);
                const isSelected = activeRegionId === st.code;

                let fillColor = '#e2e8f0'; // Neutral light slate for non-operating states
                if (isOperating) {
                  fillColor = isSelected ? '#004799' : '#0063ce'; // Brand Blue where we operate
                }

                return (
                  <path
                    key={st.code}
                    d={st.d}
                    fill={fillColor}
                    onClick={() => isOperating && setActiveRegionId(st.code)}
                    onMouseEnter={() => isOperating && setActiveRegionId(st.code)}
                    className={
                      isOperating
                        ? 'cursor-pointer transition-colors duration-200 hover:fill-[#004799]'
                        : 'transition-colors duration-200'
                    }
                  />
                );
              })}
            </g>

            {/* 2. Two-Letter State Abbreviation Labels */}
            <g className="pointer-events-none select-none">
              {US_STATES.map((st) => {
                const isOperating = Boolean(operatingRegions[st.code]);
                const isSelected = activeRegionId === st.code;

                return (
                  <text
                    key={st.code}
                    x={st.lx}
                    y={st.ly}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill={
                      st.outside
                        ? '#64748b'
                        : isOperating
                        ? '#ffffff'
                        : '#64748b'
                    }
                    fontSize={st.small ? '8.5' : '11.5'}
                    fontWeight={isOperating ? '800' : '600'}
                    style={{
                      fontFamily: 'system-ui, -apple-system, sans-serif',
                      letterSpacing: '0.02em',
                      textDecoration: isSelected ? 'underline' : 'none',
                    }}
                  >
                    {st.code}
                  </text>
                );
              })}
            </g>
          </svg>
        </div>

        {/* ── Apple-Style Dynamic Readout (Directly Below Map) ── */}
        <div className="mt-4 sm:mt-6 p-4 sm:p-5 rounded-2xl bg-slate-50/80 border border-slate-200/80 transition-all duration-200 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          {/* Left: Active State Title & Badge */}
          <div className="flex items-center space-x-2.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0063ce] animate-pulse" />
            <h4
              style={{ fontFamily: '"Whyte Inktrap", "Whyte Inktrap Medium", "ABC Whyte Inktrap", sans-serif' }}
              className="text-xl sm:text-2xl font-medium text-black tracking-tight"
            >
              {activeRegion.name}
            </h4>
            <span className="text-xs font-bold text-[#0063ce] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-md">
              {activeRegion.code}
            </span>
          </div>

          {/* Right: Operating Hubs & Depots Pills */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-1.5 sm:gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden md:inline">
              Active Hubs:
            </span>
            {activeRegion.markets.map((city, idx) => (
              <span
                key={idx}
                className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-800 shadow-2xs"
              >
                <MapPin className="w-3 h-3 text-[#0063ce]" />
                <span>{city}</span>
              </span>
            ))}
          </div>
        </div>

        {/* ── Tidy Segmented State Pill Bar (Matches Hero Sub-Tab Style) ── */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {Object.values(operatingRegions).map((reg) => {
            const isSelected = reg.id === activeRegionId;
            return (
              <button
                key={reg.id}
                onClick={() => setActiveRegionId(reg.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-full transition-all duration-150 cursor-pointer ${
                  isSelected
                    ? 'bg-black text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-black hover:bg-slate-200'
                }`}
              >
                <span className="hidden sm:inline">{reg.name} (</span>
                {reg.code}
                <span className="hidden sm:inline">)</span>
              </button>
            );
          })}
        </div>

        {/* ── Minimalist Legend (Centered, Unobtrusive) ── */}
        <div className="mt-4 pt-3 flex items-center justify-center gap-6 text-[11px] sm:text-xs text-slate-500 font-medium">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#0063ce] inline-block shadow-2xs" />
            <span className="font-semibold text-slate-700">Active Operating States (10)</span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-xs bg-[#e2e8f0] inline-block" />
            <span>Upcoming Expansion</span>
          </span>
        </div>

      </div>
    </div>
  );
}
