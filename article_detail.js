/**
 * Store all posts in local storage.
 */
function bike_set_recent_posts(posts) {
    var expiry = Date.now() + (bike_rvp_settings.expiry_period * 1000);
    posts = posts.slice(0, bike_rvp_settings.posts_to_store);

    localStorage.setItem(bike_rvp_settings.ls_name, JSON.stringify({ expiry: expiry, posts: posts }));
}

/**
 * Add a new post to local storage.
 *
 * Prepend a new post to the list of posts in local storage.
 */
function bike_add_post(newPost) {
    var savedPosts = bike_get_recent_posts();

    // Remove current post if it exists.
    savedPosts = savedPosts.filter(function (post) {
        return post.id !== newPost.id;
    });

    // Add current post to top of list.
    savedPosts.splice(0, 0, newPost);

    bike_set_recent_posts(savedPosts);
}

/**
 * Add current post to local storage if applicable.
 */
function bike_maybe_add_current_post() {
    if (!bike_rvp_settings.save_url) {
        return;
    }

    // Check publish date and post status
    // var current_time = new Date().getTime();
    // var post_time = new Date(bike_rvp_settings.post_date).getTime();
    if (bike_rvp_settings.post_status == 'publish') {

        bike_add_post({
            'id': bike_rvp_settings.post_id,
            'title': bike_rvp_settings.post_title,
            'label_new': bike_rvp_settings.label_new,
            'url': bike_rvp_settings.post_permalink,
            'image': bike_rvp_settings.post_thumbnail,
            'date': bike_rvp_settings.post_date,
            'status': bike_rvp_settings.post_status
        });
    }

    bike_display_recently_viewed()
}

bike_maybe_add_current_post()

/**
 * remove empty <p></p>
 */
$('p').each(function () {
    const $this = $(this);
    if ($this.html().replace(/\s|&nbsp;/g, '').length === 0)
        $this.remove();
});