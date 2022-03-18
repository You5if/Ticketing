import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class ProblemCatModel {
constructor(


        public problemCatId: number,
              public problem: string,
 public unDepartmentId: number, 
public description: string,
 public priority: number,
 public estimatedTime: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

