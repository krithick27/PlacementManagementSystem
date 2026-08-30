const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:8080";


// =====================================================
// USER APIs
// =====================================================

export const loginUser = async (usernameOrUser, password) => {
    let name;
    let userPassword;

    // Supports loginUser("admin", "admin123")
    if (typeof usernameOrUser === "string") {
        name = usernameOrUser;
        userPassword = password;
    }

    // Supports loginUser({ name: "admin", password: "admin123" })
    else {
        name = usernameOrUser?.name || usernameOrUser?.username;
        userPassword = usernameOrUser?.password;
    }

    const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            password: userPassword,
        }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            data.error ||
            `Login failed (${response.status})`
        );
    }

    return data;
};


export const logoutUser = async () => {
    const response = await fetch(`${API_URL}/users/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            data.error ||
            "Logout failed"
        );
    }

    return data;
};


export const addUser = async (user) => {
    const response = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add user");
    }

    return data;
};


export const updateUser = async (user) => {
    const response = await fetch(`${API_URL}/users`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update user");
    }

    return data;
};


// =====================================================
// STUDENT APIs
// =====================================================

export const addStudent = async (student) => {
    const response = await fetch(`${API_URL}/students`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to add student");
    }

    return data;
};


export const updateStudent = async (student) => {
    const response = await fetch(`${API_URL}/students`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Failed to update student");
    }

    return data;
};


export const getStudentById = async (id) => {
    const response = await fetch(`${API_URL}/students/${id}`);

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Student not found");
    }

    return data;
};


export const getStudentByHallTicket = async (hallTicketNo) => {
    const response = await fetch(
        `${API_URL}/students/hallticket/${hallTicketNo}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Student not found");
    }

    return data;
};


export const addCertificate = async (certificate) => {
    const response = await fetch(
        `${API_URL}/students/certificate`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(certificate),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add certificate"
        );
    }

    return data;
};


export const updateCertificate = async (certificate) => {
    const response = await fetch(
        `${API_URL}/students/certificate`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(certificate),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update certificate"
        );
    }

    return data;
};


export const deleteStudent = async (id) => {
    const response = await fetch(
        `${API_URL}/students/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete student"
        );
    }

    return data;
};


// =====================================================
// COLLEGE APIs
// =====================================================

export const addCollege = async (college) => {
    const response = await fetch(`${API_URL}/colleges`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(college),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add college"
        );
    }

    return data;
};


export const updateCollege = async (college) => {
    const response = await fetch(`${API_URL}/colleges`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(college),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update college"
        );
    }

    return data;
};


export const getCollegeById = async (id) => {
    const response = await fetch(
        `${API_URL}/colleges/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "College not found"
        );
    }

    return data;
};


export const searchCollege = async (college) => {
    const response = await fetch(
        `${API_URL}/colleges/search`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(college),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "College search failed"
        );
    }

    return data;
};


export const deleteCollege = async (id) => {
    const response = await fetch(
        `${API_URL}/colleges/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to delete college"
        );
    }

    return data;
};


export const schedulePlacement = async (placement) => {
    const response = await fetch(
        `${API_URL}/colleges/schedule-placement`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(placement),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message ||
            "Failed to schedule placement"
        );
    }

    return data;
};


// =====================================================
// PLACEMENT APIs
// =====================================================

export const addPlacement = async (placement) => {
    const response = await fetch(
        `${API_URL}/placements`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(placement),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to add placement"
        );
    }

    return data;
};


export const updatePlacement = async (placement) => {
    const response = await fetch(
        `${API_URL}/placements`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(placement),
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to update placement"
        );
    }

    return data;
};


export const getPlacementById = async (id) => {
    const response = await fetch(
        `${API_URL}/placements/${id}`
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Placement not found"
        );
    }

    return data;
};


export const deletePlacement = async (id) => {
    const response = await fetch(
        `${API_URL}/placements/${id}`,
        {
            method: "DELETE",
        }
    );

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
            data.message || "Failed to cancel placement"
        );
    }

    return data;
};


// =====================================================
// DEFAULT EXPORT
// =====================================================

export default {
    loginUser,
    logoutUser,

    addUser,
    updateUser,

    addStudent,
    updateStudent,
    getStudentById,
    getStudentByHallTicket,
    addCertificate,
    updateCertificate,
    deleteStudent,

    addCollege,
    updateCollege,
    getCollegeById,
    searchCollege,
    deleteCollege,
    schedulePlacement,

    addPlacement,
    updatePlacement,
    getPlacementById,
    deletePlacement,
};