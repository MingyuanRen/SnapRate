from utils.redis_helper import RedisHelper


def incr_likes_count(sender, instance, created, **kwargs):
    from share.models import Tweet
    from django.db.models import F

    if not created:
        return

    model_class = instance.content_type.model_class()
    if model_class != Tweet:
        return
    Tweet.objects.filter(id=instance.object_id).update(likes_count=F('likes_count') + 1)
    tweet = instance.content_object
    RedisHelper.incr_count(tweet, 'likes_count')


def decr_likes_count(sender, instance, **kwargs):
    from share.models import Tweet
    from django.db.models import F

    model_class = instance.content_type.model_class()
    if model_class != Tweet:
        return

    # handle tweet likes cancel
    Tweet.objects.filter(id=instance.object_id).update(likes_count=F('likes_count') - 1)
    tweet = instance.content_object
    RedisHelper.decr_count(tweet, 'likes_count')
