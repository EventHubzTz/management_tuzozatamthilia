export const userFormFields = [
    { name: "first_name", type: "text", label: "First Name", notRequired: false, minimumCharacters: 3 },
    { name: "last_name", type: "text", label: "Last Name", notRequired: false, minimumCharacters: 3 },
    { name: "email", type: "email", label: "Email", notRequired: false, minimumCharacters: 3 },
    { name: "phone_no", type: "text", label: "Phone Number (2557xxxxxxxx)", notRequired: false, minimumCharacters: 3 },
    {
        name: "gender",
        type: "select",
        label: "Gender",
        items: [
            { value: 'MALE', label: "MALE", },
            { value: 'FEMALE', label: "FEMALE", },
        ],
        notRequired: false,
        minimumCharacters: 3
    },
    { name: "password", type: "password", label: "Password", notRequired: false, minimumCharacters: 6 },
    {
        name: "role",
        type: "select",
        label: "Role",
        items: [
            { value: 'EVENT_PLANNER', label: "EVENT PLANNER", },
            { value: 'SUPER_ADMIN', label: "SUPER ADMIN", },
        ],
        notRequired: false,
        minimumCharacters: 3
    },
]