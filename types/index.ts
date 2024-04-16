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


type AlertData = {
    _id: string;
    user_id: string;
    easycron_id: string;
    active: boolean;
    alert_type: 'registration_fee';
    name: string;
    cron: '*/20 * * * *';
    last_sent: number;
    date_created: number;
    persistent: boolean;
    metadata?: {
        subnet_id?: number;
        price_cutoff?: number;
        webhook_url?: string;
    };
}

export type { ApiKeyData, UserData, BreadcrumbData, AlertData }

