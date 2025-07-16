import { useEffect, useState } from 'react';
import { Profile } from '@models/Profile.ts';
import { getAllEmployees } from '@networks/request/profile.ts';

const useEmployeeScene = () => {
    const [employees, setEmployees] = useState<Profile[]>();

    useEffect(() => {
        if (!employees) {
            fetchEmployeeData();
        }
    }, [employees]);

    const fetchEmployeeData = () => {
        getAllEmployees().then(data => {
            setEmployees(data);
        });
    };

    return {
        employees,
    };
};

export default useEmployeeScene;
