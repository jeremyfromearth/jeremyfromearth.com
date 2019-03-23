import * as _ from 'lodash'

export default {
  keywords: state => state.keywords,
  projects_per_page: state => state.projects_per_page,
  pagination: state => state.pagination,
  project_results: state => {
    // This getter returns the projects that are currently displayed
    // These include:
    //  - All projects
    //    - if there are keywords
    //      - projects that match keywords
    //    - if there is selected tech
    //      - projects with selected tech
    //    - if there are collaborators in the keywrods
    //      - projects with selected collaborators
    //  - Only projects included in the current pagination

    if(state.keywords.length) {
      let terms = state.keywords.reduce((acc, obj) => {
        acc.push(obj.term); 
        return acc
      }, [])
      let results = _.values(_.pick(state.index, terms))
      results = results.map(x => Array.from(x))
      results = _.intersection(...results)
      results = _.values(_.pick(state.lookup, results)).sort((a, b) => a.year - b.year).reverse()
      return results.slice(state.pagination, state.pagination + state.projects_per_page)
    }
    
    return state.projects.slice(state.pagination, state.pagination + state.projects_per_page)
  },
  project_sort_keys: (state, getters) =>  _.uniq(_.map(getters.project_results, 'year')),
  project_count: (state) => state.projects.length,
  window_size: state => {
    return state.window_size
  }
}
