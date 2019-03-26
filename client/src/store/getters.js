import * as _ from 'lodash'

export default {
  blog_posts: state => state.blog_posts,
  keywords: state => state.keywords,
  pagination: state => state.pagination,
  projects_paged: state => state.project_search_results.slice(state.pagination, state.pagination + state.projects_per_page),
  projects_per_page: state => state.projects_per_page,
  project_sort_keys: (state, getters) =>  _.uniq(_.map(getters.projects_paged, 'year')),
  project_search_results: state => state.project_search_results,
  technologies: state => state.technologies,
  window_size: state => state.window_size
}
