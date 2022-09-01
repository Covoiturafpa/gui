import React from 'react';
import ReactDOM from 'react-dom/client';
import "rsuite/dist/rsuite.min.css";

const divRoot = document.querySelector('#root');

const root = ReactDOM.createRoot(divRoot);
root.render(<>
        <Routes>
            <Route path="coucou" element={ <Coucou/> }/>
            
            <Route path="*" element={ <h2>Not found</h2> }/>
        </Routes>
</>);
