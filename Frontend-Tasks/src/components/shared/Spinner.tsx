interface Props {
  size?: 'sm' | 'md' | 'lg'
  color?: 'white' | 'blue' | 'gray'
}

const sizes = {
  sm: 'w-4 h-4',
  md: 'w-5 h-5',
  lg: 'w-8 h-8',
}

const colors = {
  white: 'border-white/30 border-t-white',
  blue:  'border-blue-200 border-t-blue-600',
  gray:  'border-gray-200 border-t-gray-500',
}

export const Spinner = ({ size = 'md', color = 'white' }: Props) => (
  <div className={`
    ${sizes[size]} ${colors[color]}
    rounded-full border-2 animate-spin shrink-0
  `} />
)