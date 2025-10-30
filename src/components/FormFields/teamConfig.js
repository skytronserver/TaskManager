import * as Yup from "yup";

export const teamInitialValues = {
    teamName: "",
    department: "",
    description: "",
    teamLeader: "",
    maxMembers: "",
    createdDate: "",
};

export const teamFormField = {
    teamName: {
        name: "teamName",
        type: "text",
        label: "Team Name",
        validation: Yup.string()
            .required("Team Name is required")
            .min(3, "Team Name must be at least 3 characters")
            .trim(),
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

    description: {
        name: "description",
        type: "text",
        label: "Team Description",
        validation: Yup.string()
            .nullable()
            .trim(),
    },

    teamLeader: {
        name: "teamLeader",
        type: "select",
        label: "Team Leader",
        options: [
            { value: "john_doe", label: "John Doe" },
            { value: "jane_smith", label: "Jane Smith" },
            { value: "mike_johnson", label: "Mike Johnson" },
            { value: "sarah_williams", label: "Sarah Williams" },
            { value: "david_brown", label: "David Brown" },
        ],
        validation: Yup.string()
            .required("Team Leader is required")
            .trim(),
    },

    maxMembers: {
        name: "maxMembers",
        type: "number",
        label: "Maximum Team Members",
        validation: Yup.number()
            .min(1, "Maximum members must be at least 1")
            .max(100, "Maximum members cannot exceed 100")
            .required("Maximum members is required"),
    },

    createdDate: {
        name: "createdDate",
        type: "date",
        label: "Team Creation Date",
        validation: Yup.date()
            .nullable()
            .max(new Date(), "Creation date cannot be in the future"),
    },
};
