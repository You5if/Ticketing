import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class PolicyModel {
constructor(


        public policyId: number,
public legacyId: number, public legacyCode: string, public legacyCustId: number, public unCustomerId: number, public policyCode: string, public policyType: number, public issuedOn: Date, public effectiveFrom: Date, public expiryDate: Date, public description: string, public insuredAmount: number, public preminumAmount: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

