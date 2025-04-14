import { Route, Routes } from 'react-router-dom';
import { ApsCallback, ApsLogin } from '../components';

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<ApsLogin />} />
            <Route path="/callback" element={<ApsCallback />} />

        </Routes>
    );
};

export default Router;
