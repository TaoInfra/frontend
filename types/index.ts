type ApiKeyData = {
    _id: string;
    name: string;
    user_id: string;
    date_created: number;
    key: string;
    scope: string[];
}

type UserData = {
    _id: string;
    name: string;
    email_id: string;
    date_created: number;
}


type BreadcrumbData = {
    label: string;
    href?: string;
}
export type { ApiKeyData, UserData, BreadcrumbData }

