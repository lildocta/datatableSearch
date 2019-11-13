import { LightningElement, track} from 'lwc';
const mockData = [{Id:'123456789833',Name:'test',CreatedDate:'11/2/2019', Subject:'Test Subject 1', Custom_Field__c: 'Custom1'},{Id:'123456789844',Name:'test2',CreatedDate:'11/2/2019', Subject:'Test Subject 1', Custom_Field__c: 'Custom1'},{Id:'12345678900',Name:'test4',CreatedDate:'11/1/2019', Subject:'Test Subject 5', Custom_Field__c: 'Custom2'},{Id:'123456789226',Name:'test0',CreatedDate:'10/2/2019', Subject:'Test Subject 10', Custom_Field__c: 'Custom20'},{Id:'123456711879',Name:'test6',CreatedDate:'9/4/2018', Subject:'Test Subject 7', Custom_Field__c: 'Custom7'}];
const columns = [
    { label: 'Name', fieldName: 'Name'}, 
    { label: 'Created Date', fieldName: 'CreatedDate'}, 
    { label: 'Subject', fieldName: 'Subject'}, 
    { label: 'Custom Field', fieldName: 'Custom_Field__c'}, 
]
export default class datatable extends LightningElement {
    @track filteredData = mockData;
    @track columns = columns;
    allData = mockData;
    filterableFields = ['Name', 'CreatedDate','Subject', 'Customer_Field__c'];
    
    handleResults(event){
        this.filteredData = event.detail.filteredData
    }
}