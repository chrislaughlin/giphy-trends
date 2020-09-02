import React, { useState } from 'react';
import {StyledApp} from "./styles";
import Playing from "./playing";

const App = () => {
    const [playing, setPlaying] = useState(false);
    return (
        <StyledApp>
            <h1>
                Are you on trend?
            </h1>
            {
                !playing &&
                <button
                    onClick={() => setPlaying(true)}
                >
                    PLAY
                </button>
            }
            {
                playing &&
                <Playing
                    onDone={() => setPlaying(false)}
                />
            }
        </StyledApp>
    );
}

export default App;
