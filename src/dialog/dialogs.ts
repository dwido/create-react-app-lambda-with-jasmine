import {createDialogs} from "react-hook-dialog";

import { useDialog } from "react-hook-dialog";

function Dialog({ isOpen, close, params }) {
    const dialogResult = "RESULT"
    return (
        <>
            {isOpen && (
            <div>
                <h1>DIALOG HEADER</h1>
    <button onClick={() => close(dialogResult)}>close</button>
    </div>
)}
    </>
)
}

function Example() {
    const {
        isOpen
        open
        close
        params,
        results
    } = useDialog<ParamsType, ResultsType>({
        isDefaultOpen: false; // Set dialog open after first render
    });

    const openHandler = useCallback(async () => {
        const dialogParams = "PARAM"
        const resultsFromDialog = await open(dialogParams); // It returns results passed as argument to close method
    }, []);

    return (
        <>
            <button onClick={openHandler}>OPEN DIALOG</button>
    <Dialog isOpen={isOpen} close={close} params={params} />
    </>
)
}
