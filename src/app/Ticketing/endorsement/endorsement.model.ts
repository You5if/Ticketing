import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class EndorsementModel {
constructor(


        public endorsementId: number,
public legacyId: number,
 public legacyCode: string,
 public policyId: number,
 public endorsementCode: string,
 public endorsementDate: Date,
 public description: string,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

