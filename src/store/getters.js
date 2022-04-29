import * as _ from 'lodash'

export default {
  blog_posts: state => state.blog_posts,
  education: state => state.education,
  employment: state => state.employment,
  highlighting: state => state.highlighting,
  keywords: state => state.keywords,
  links: state => state.links,
  pagination: state => state.pagination,
  project_lookup: (state) => state.project_lookup,
  project_sort_keys: (state, getters) =>  _.uniq(_.map(getters.projects_paged, 'year')),
  projects_paged: state =>
    state.project_search_results.slice(
      state.pagination, state.pagination + state.projects_per_page),
  projects_per_page: state => state.projects_per_page,
  project_search_results: state => state.project_search_results,
  screen_is_small: state => state.window_size[0] < 768,
  tech_merged_sorted: state =>
    Object.values(state.technologies)
      .sort((a, b) => a.label.localeCompare(b.label)),
  technologies: state => state.technologies,
  text: state => state.text,
  topics: state => state.topics,
  topic_index: state => state.topic_index,
  topics_palette: state => state.topics_palette,
  video_id: state => state.video_id,
  window_size: state => state.window_size
}
