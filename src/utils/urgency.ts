import type {Data,Severity} from '../types/domain';
const severityWeight:Record<Severity,number>={low:2,medium:5,high:12,critical:26};
export function urgency(data:Data,departmentId:string,now=new Date()){
 const issues=data.issues.filter(i=>i.departmentId===departmentId&&i.status!=='resolved');
 const overdue=data.tasks.filter(t=>t.departmentId===departmentId&&t.status!=='done'&&new Date(t.due)<now);
 const missed=data.projects.filter(p=>p.departmentId===departmentId).flatMap(p=>p.milestones).filter(m=>!m.done&&new Date(m.due)<now);
 const escalations=issues.filter(i=>i.escalated).length;
 const score=Math.min(100,issues.reduce((n,i)=>n+severityWeight[i.severity],0)+overdue.length*8+missed.length*10+escalations*9);
 const level: 'critical'|'high'|'normal'|'healthy'=score>=60?'critical':score>=35?'high':score>=15?'normal':'healthy';
 return {score,level,issues:issues.length,critical:issues.filter(i=>i.severity==='critical').length,overdue:overdue.length,missed:missed.length,escalations};
}
export const urgencyColor={critical:'#ce534d',high:'#d99242',normal:'#5b8dc0',healthy:'#5b9b78'};
