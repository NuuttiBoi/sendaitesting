import { useState, useEffect } from 'react'

const ColorThemes = () => {
    const [lightTheme, setLightTheme] = useState(false)
    const [darkTheme, setDarkTheme] = useState(false)
    const [secretTheme, setSecretTheme] = useState(false)

    useEffect(() => {
        const preference = localStorage.getItem('theme');

        if (preference === 'light' || preference === null) {
            changeLightTheme()
        } else if (preference === 'dark') {
            changeDarkTheme()
        } else {
            changeSecretTheme()
        }
    }, []);

    const changeLightTheme = () => {
        setLightTheme(true)
        setDarkTheme(false)
        setSecretTheme(false)
        document.querySelector('body').classList.remove('darkTheme', 'secretTheme')
    }

    const changeDarkTheme = () => {
        setDarkTheme(true)
        setLightTheme(false)
        setSecretTheme(false)
        document.querySelector('body').classList.add('darkTheme')
        document.querySelector('body').classList.remove('secretTheme')
    }

    const changeSecretTheme = () => {
        setSecretTheme(true)
        setDarkTheme(false)
        setLightTheme(false)
        document.querySelector('body').classList.add('secretTheme')
        document.querySelector('body').classList.remove('darkTheme')
    }

    const handleLightThemeChange = () => {
        changeLightTheme()
        localStorage.setItem('theme', 'light')
    }

    const handleDarkThemeChange = () => {
        changeDarkTheme()
        localStorage.setItem('theme', 'dark')
    }

    const handleSecretThemeChange = () => {
        changeSecretTheme()
        localStorage.setItem('theme', 'secret')
    }

    return (
        <div className="themeButtons">
            <label className="themeButton">
                <input type="checkbox" checked={lightTheme} className="themeButton" onChange={handleLightThemeChange}/>
                <span className="checkmark light"></span>
            </label>
            <label className="themeButton">
                <input type="checkbox" checked={darkTheme} className="themeButton" onChange={handleDarkThemeChange}/>
                <span className="checkmark dark"></span>
            </label>
            <label className="themeButton">
                <input type="checkbox" checked={secretTheme} className="themeButton" onChange={handleSecretThemeChange}/>
                <span className="checkmark secret"></span>
            </label>
        </div>
    )
}

export default ColorThemes