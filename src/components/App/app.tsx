import React, { useEffect, useState } from 'react';

import style from './app.module.scss';

interface TestRecord {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const App = () => {
    const [testData, setTestData] = useState<TestRecord | null>(null);

    useEffect(() => {
        fetch('https://peak-flow-app.herokuapp.com/test-endpoint')
            .then((response) => response.json())
            .then((json) => setTestData(json));
    }, []);

    return (
        <div className={style.root}>
            <h1>Hello World!!!</h1>
            {testData ? (
                <div>
                    <p>User ID: {testData.userId}</p>
                    <p>ID: {testData.id}</p>
                    <p>Title: {testData.title}</p>
                    <p>Completed: {testData.completed ? 'true' : 'false'}</p>
                </div>
            ) : (
                'Loading...'
            )}
        </div>
    );
};

export default App;
