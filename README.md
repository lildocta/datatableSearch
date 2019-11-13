This project is a fully functional example of the datatableSearch functionality with an example datatable with mock data

How to Use

add the below lines of code above your data table
```
  <div class="slds-align_absolute-center slds-m-around_medium">
      <c-datatable-search all-data={mockData} onfiltered={handleResults} placeholder="Search" label=""></c-datatable-search>
  </div>
```
all-data is a required field and onfiltered is required if you want to actually update the datatables results (note: allData should not be used to populate your datatable, use filteredData instead and initialize it to all data when you first get the data back).  

The onfiltered event listener requires you to add a javascript method if you want to handle the data on callback

fields-to-filter-on is an optional list of fields, if you don't put any fields in it will by default fitler on all fields passed in the data

label is optional, if you do not include one the input is set to variant="label-hidden" and has no label

placeholder is optional, by default it is set to the word 'search'

in the filterData method of datatableSearch.js you can change the regex expression to alter the type of search, by default it search on the input the exact string the users enters (no fuzzy filtering built in)

the handleResults method should look something like this
```
handleResults(event){
  this.filteredData = event.detail.filteredData
  //where this.filteredData is the variable used to enter data into your datatable
}
```

Datatable Example
```
  <lightning-datatable
      key-field="Id" //can be any key field you want
      data={filteredData} //this should be a different variable then the allData variable you pass to the lwc
      columns={columns} //whatever columns you want to display
      >
  </lightning-datatable>
```

Full html Example
```
  <div class="slds-align_absolute-center slds-m-around_medium">
            <c-datatable-search label="" all-data={mockData} placeholder="Search" onfiltered={handleResults}></c-datatable-search>
        </div>
  <lightning-datatable
      key-field="Id" //can be any key field you want
      data={filteredData} //this should be a different variable then the allData variable you pass to the lwc
      columns={columns} //whatever columns you want to display
      >
  </lightning-datatable>
```
