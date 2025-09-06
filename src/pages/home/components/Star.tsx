import { randInt } from "@/common"

export default function Star() {
    const customStyles: React.CSSProperties = {
        top: `${randInt(100)}%`,
        left: `${randInt(100)}%`,
        opacity: `${randInt(100, 25)}`,
        width: `${randInt(1, 4)}px`,
        boxShadow: `0px 0px ${randInt(18, 6)}px white`
    }

    return <div style={customStyles} className='absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-300 aspect-square' />
}