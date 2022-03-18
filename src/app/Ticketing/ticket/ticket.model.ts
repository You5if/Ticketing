import { AuditModel } from 'src/app/components/misc/AuditParams.Model';

// Definition of our model class
export class TicketModel {
constructor(


        public ticketId: number,
public problemCatId: number,
 public remarks: string,
 public comment: string,
 public unCustomerId: number,
public policyId: number, 
public inquiryType: number,
 public status: number,
 public appUserId: number,
 public unDepartmentId: number,
 public parentTicketId: number,
        public entryMode: string,
        public active: boolean,
        public readOnly: boolean,
        public auditColumns: any,
) { }
}

export class TicketCommentModel { constructor( public ticketCommentId: number, public ticketId: number, public appUserId: number, public commentDate: Date, public comment: string, public active: boolean, public entryMode: string, public readOnly: boolean, public auditColumns: any, ) { } }

export class TicketAttachModel { constructor( public ticketAttachId: number, public ticketId: number, public appUserId: number, public aPIImagePath: string, public aPIPath: string, public extension: string, public fileName: string, public fullPath: string, public originalFileName: string, public active: boolean, public entryMode: string, public readOnly: boolean, public auditColumns: any, ) { } }