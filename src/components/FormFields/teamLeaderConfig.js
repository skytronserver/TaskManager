import * as Yup from "yup";

export const teamLeaderInitialValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    employeeId: "",
    joiningDate: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    emergencyContact: "",
    emergencyPhone: "",
};

export const teamLeaderFormField = {
    firstName: {
        name: "firstName",
        type: "text",
        label: "First Name",
        validation: Yup.string()
            .required("First Name is required")
            .min(2, "First Name must be at least 2 characters")
            .trim(),
    },

    lastName: {
        name: "lastName",
        type: "text",
        label: "Last Name",
        validation: Yup.string()
            .required("Last Name is required")
            .min(2, "Last Name must be at least 2 characters")
            .trim(),
    },

    email: {
        name: "email",
        type: "email",
        label: "Email",
        validation: Yup.string()
            .email("Invalid email format")
            .required("Email is required")
            .trim(),
    },

    phone: {
        name: "phone",
        type: "text",
        label: "Phone Number",
        validation: Yup.string()
            .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
            .required("Phone Number is required"),
    },

    department: {
        name: "department",
        type: "select",
        label: "Department",
        options: [
            { value: "sales", label: "Sales" },
            { value: "marketing", label: "Marketing" },
            { value: "engineering", label: "Engineering" },
            { value: "human_resources", label: "Human Resources" },
            { value: "finance", label: "Finance" },
            { value: "operations", label: "Operations" },
            { value: "customer_support", label: "Customer Support" },
        ],
        validation: Yup.string()
            .required("Department is required")
            .trim(),
    },

    employeeId: {
        name: "employeeId",
        type: "text",
        label: "Employee ID",
        validation: Yup.string()
            .required("Employee ID is required")
            .min(3, "Employee ID must be at least 3 characters")
            .trim(),
    },

    joiningDate: {
        name: "joiningDate",
        type: "date",
        label: "Joining Date",
        validation: Yup.date()
            .nullable()
            .max(new Date(), "Joining date cannot be in the future"),
    },

    address: {
        name: "address",
        type: "text",
        label: "Address",
        validation: Yup.string()
            .nullable()
            .trim(),
    },

    city: {
        name: "city",
        type: "text",
        label: "City",
        validation: Yup.string()
            .nullable()
            .trim(),
    },

    state: {
        name: "state",
        type: "text",
        label: "State",
        validation: Yup.string()
            .nullable()
            .trim(),
    },

    zipCode: {
        name: "zipCode",
        type: "text",
        label: "Zip Code",
        validation: Yup.string()
            .matches(/^[0-9]{6}$/, "Zip Code must be 6 digits")
            .nullable(),
    },

    emergencyContact: {
        name: "emergencyContact",
        type: "text",
        label: "Emergency Contact Name",
        validation: Yup.string()
            .nullable()
            .trim(),
    },

    emergencyPhone: {
        name: "emergencyPhone",
        type: "text",
        label: "Emergency Contact Phone",
        validation: Yup.string()
            .matches(/^[0-9]{10}$/, "Emergency phone must be 10 digits")
            .nullable(),
    },
};
