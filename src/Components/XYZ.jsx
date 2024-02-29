import React, { useState, useCallback } from 'react'
import { Button } from 'antd'
import { DraggableModal, DraggableModalProvider } from 'ant-design-draggable-modal'

import 'ant-design-draggable-modal/dist/index.css'

function XYZ() {

    const [visible, setVisible] = useState(false)
    const onOk = useCallback(() => setVisible(true), [])
    const onCancel = useCallback(() => setVisible(false), [])


    return (
        <div>
            <Button onClick={onOk}>Open</Button>
            <DraggableModal visible={visible} onOk={onOk} onCancel={onCancel} style={{height:500 , width:500 } } >
                Body text.
            </DraggableModal>
        </div>
    )
}

export default XYZ