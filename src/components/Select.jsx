import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
    label,
    options,
    classname = '',
    ...props

}, ref) {
    const id = useId();
    return (
        <div>
            {label && <label className='text-lg' htmlFor={id}>{label}</label>}
            <select className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full${classname}`} {...props} id={id} ref={ref}>
                {
                    options?.map((option) => (
                        <option key={option} value={option}>{option}</option>
                    ))
                }
            </select>
        </div >
    )
})

export default Select