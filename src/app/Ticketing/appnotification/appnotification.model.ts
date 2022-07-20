import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class AppNotificationModel {
constructor(


        public appNotificationId: number,
                public notTime: string,
                public notMessage: string,
                public notTitle: string,
                public appUserId: number,
                public isRead: boolean,
                public totalPages: number,
                public totalRecords: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

