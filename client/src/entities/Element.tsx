import React from 'react'
import { FC } from 'react';
import { css } from '@emotion/css'

interface ElementProps {
    elementName: string,
    selectedElement: string,
    clickOnElement: (element: string) => void
}

const Element: FC<ElementProps> = ({elementName, selectedElement, clickOnElement}) => {

    const clickHandler = (e: React.MouseEvent<HTMLDivElement, MouseEvent>): void => {
        clickOnElement(elementName);
    }

    
    return (
        <div onClick={(e) => clickHandler(e)} data-value={elementName}>
            <button
                data-value={elementName}
                className={elementName === selectedElement ? css`
                width: 50px;
                height: 50px;
                background-color: lightblue;
                ` : 
                    css`
                    width: 50px;
                    height: 50px;
                `}
                >
                <img className={css`width: 100%;`} src={require(`../assets/${elementName}.png`)} alt={elementName} />
            </button>
        </div>
    )
}

export default Element;