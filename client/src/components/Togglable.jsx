import { useState,useImperativeHandle } from 'react'
import { Button } from '@mui/material'

const Togglable = (props) => {
  const [visible, setVisible]=useState(false)

  const hideWhenVisible={ display:visible ? 'none' :'',marginTop:'1em'  }
  const showWhenVisible={ display:visible ? '' :'none'  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }
  useImperativeHandle(props.ref, () => {
    return { toggleVisibility }
  })

  return(
    <div>
      <div style={hideWhenVisible}>
        <Button variant='contained' onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant='contained' sx={{mt:'1em',height:'2em'}} onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
  )
}


export default Togglable