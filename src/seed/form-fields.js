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

export const eventFormFields = [
    { name: "event_name", type: "text", label: "Event Name", notRequired: false, minimumCharacters: 3 },
    { name: "event_location", type: "text", label: "Event Location", notRequired: false, minimumCharacters: 3 },
    { name: "event_time", type: "text", label: "Event Time", notRequired: false, minimumCharacters: 3 },
    { name: "event_description", type: "text", label: "Event Description", notRequired: false, minimumCharacters: 3 },
]