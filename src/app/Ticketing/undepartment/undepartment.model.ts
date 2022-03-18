import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class UnDepartmentModel {
constructor(


        public unDepartmentId: number,
             public deptName: string,
 public deptCode: string,
 public appUserId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

