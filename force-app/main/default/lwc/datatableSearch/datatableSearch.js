import { LightningElement, track, api } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent'
const SEARCH_DELAY = 500;

export default class datatableSearch extends LightningElement {
    
    //input parameters for lwc
    @api placeholder = 'Search';
    @api allData = [];
    @api fieldsToFilterOn = [];
    @api label = '';

    @track noFields = false;
    searchTimeout;
    get labelIncluded(){
        return ( this.label === '' ? 'label-hidden' : ''); 
    }

    showToast(title, msg, variant) {
        const toastEvent = new ShowToastEvent({
            title: title,
			message: msg,
			variant: variant
        });
        this.dispatchEvent(toastEvent);
    }
    
    ensureFilterableFields(){
        if(this.fieldsToFilterOn.length === 0 && this.allData.length !== 0){
            this.fieldsToFilterOn = Object.keys(this.allData[0]);
            return true;
        } else if(this.fieldsToFilterOn.length === 0) {
            this.noFields = true;
            this.template.querySelector('lightning-input').value = '';
            this.showToast('Search Disabled', 'There are no fields to filter on', 'info')
            return false;
        }
        return false;
    }

    search(event){
        //if the developer does not pass any data nor any fields before the user first begins typing the search will disable
        if(!this.ensureFilterableFields()) return;
        // Apply search throttling (prevents search if user is still typing)
        if (this.searchTimeout) {
           clearTimeout(this.searchTimeout);
        }
        let searchFilter = event.target.value;
        // eslint-disable-next-line @lwc/lwc/no-async-operation
        this.searchTimeout = setTimeout(() => {
            if(searchFilter.length <= 1){
                //return all data if input is invalid
                let returnObj = {filteredData: this.allData, searchTerm: searchFilter, validTerm:false}
                let searchResultFound = new CustomEvent('filtered', {detail: returnObj});
                this.dispatchEvent(searchResultFound);
            } else {
                    // Send search event if no user input for length of SEARCH_DELAY in ms and input is valid
                this.filterData(searchFilter)
            }
            this.searchTimeout = null;     
        }, SEARCH_DELAY);
    }

    filterData(searchFilter){
        let results; 
        try {
            //searches for an exact character match but is not case sensitive
            let regex = new RegExp(searchFilter, "i");
            // The filter checks each object on every field passed in, in the fieldsToFilterOn array, if any matches are found the object is returned
            results = this.allData.filter(row => {
                let matchFound = false;
                this.fieldsToFilterOn.forEach(filterFieldName => {
                    if(regex.test(row[filterFieldName])){
                        matchFound = true;
                    }
                });
                return matchFound;
            })
            //return obj constructed
            let returnObj = {filteredData: results, searchTerm: searchFilter, validTerm:true}
            let searchResultFound = new CustomEvent('filtered', {detail: returnObj});
            this.dispatchEvent(searchResultFound);
        } catch (e) {
            this.data = [];
        }
            
    }
}