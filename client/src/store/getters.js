import * as _ from 'lodash'

export default {
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

    return state.projects.slice(state.pagination, state.pagination + 3)
  },
  project_sort_keys: (state, getters) =>  _.uniq(_.map(getters.project_results, 'year')),
  window_size: state => {
    return state.window_size
  }
}
