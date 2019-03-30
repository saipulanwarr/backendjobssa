'use strict'

const Job = use('App/Models/Job');
const DataGrid = use('DataGrid');

class JobController {
    async index({ response }){
        try{
            const config = {
                query(){
                    return Job.query().with('user')
                },

                sortable: {
                    title_job: 'title_job',
                    deleted (query, value){
                        query[+value ? 'whereNotNull' : 'whereNUll']('deleted_at')
                    }
                },
    
                searchable: ['title_job'],
    
                filterable: {
                    title_job: 'title_job'
                },
    
                exportOptions: {
                    fields: [
                        {label: 'title_job', value: 'title_job'},
                        {
                            label: 'Deleted',
                            value: row => row.deleted_at ? 'YES' : 'NO',
                        }
                    ]
                }
    
            }
    
            return DataGrid.paginate(config);
        }
        catch(e){
            return response.status(404).json({
                data: 'something went wrong'
            })
        }
    }
}

module.exports = JobController
