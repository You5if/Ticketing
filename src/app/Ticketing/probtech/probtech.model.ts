import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProbTechModel {
constructor(


        public probTechId: number,
public problemCatId: number,
 public appUserId: number,
 public level: number,
 public remarks: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

