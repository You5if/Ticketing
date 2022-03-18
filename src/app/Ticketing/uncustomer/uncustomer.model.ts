import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class UnCustomerModel {
constructor(


        public unCustomerId: number,
               public customerName: string, public customerCode: string, public contactPerson1: string, public contact: string, public contactPerson2: string, public clientType: number, public coreActivity: string, public segment: string, public subSegment: string, public office: string, public businessClass: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

