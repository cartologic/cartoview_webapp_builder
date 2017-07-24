from django.shortcuts import render, HttpResponse
from django.contrib.auth.decorators import login_required

import json

from django.utils.safestring import mark_safe
from geonode.maps.views import _PERMISSION_MSG_VIEW

from cartoview.app_manager.models import AppInstance, App
from cartoview.app_manager.views import _resolve_appinstance

from . import APP_NAME

def save(request, instance_id=None, app_name=APP_NAME):
    res_json = dict(success=False)

    data = json.loads(request.body)
    map_id = data.get('map', None)
    title = data.get('title', "")
    config = json.dumps(data.get('config', None))
    abstract = data.get('abstract', "")
    access = data.get('access', None)
    keywords = data.get('keywords', [])

    if instance_id is None:
        instance_obj = AppInstance()
        instance_obj.app = App.objects.get(name=app_name)
        instance_obj.owner = request.user
    else:
        instance_obj = AppInstance.objects.get(pk=instance_id)

    instance_obj.title = title
    instance_obj.config = config
    instance_obj.abstract = abstract
    instance_obj.map_id = map_id
    instance_obj.save()

    if access == "private":
        permessions = {
                'users': {
                    '{}'.format(request.user): [
                        'view_resourcebase',
                        'download_resourcebase',
                        'change_resourcebase_metadata',
                        'change_resourcebase',
                        'delete_resourcebase',
                        'change_resourcebase_permissions',
                        'publish_resourcebase',
                    ],
                    # 'AnonymousUser': [
                    #     'view_resourcebase',
                    #     # 'download_resourcebase',
                    #     # 'change_resourcebase_metadata',
                    #     # 'change_resourcebase',
                    #     # 'delete_resourcebase',
                    #     # 'change_resourcebase_permissions',
                    #     # 'publish_resourcebase',
                    # ],
                }
            }
    else:
        permessions = {
                'users': {
                    'AnonymousUser': [
                        'view_resourcebase',
                        'download_resourcebase',
                        'change_resourcebase_metadata',
                        'change_resourcebase',
                        'delete_resourcebase',
                        'change_resourcebase_permissions',
                        'publish_resourcebase',
                    ],
                }
            }
    # set permissions so that no one can view this appinstance other than
    #  the user
    instance_obj.set_permissions(permessions)

    # update the instance keywords
    if hasattr(instance_obj, 'keywords'):
        for k in keywords:
            if k not in instance_obj.keyword_list():
                instance_obj.keywords.add(k)

    res_json.update(dict(success=True, id=instance_obj.id))
    return HttpResponse(json.dumps(res_json), content_type="application/json")


@login_required
def new(request, template="%s/new.html" % APP_NAME, app_name=APP_NAME, context={}):
    if request.method == 'POST':
        return save(request, app_name=app_name)
    return render(request, template, context)


@login_required
def edit(request, instance_id, template="%s/edit.html" % APP_NAME, context={}):
    if request.method == 'POST':
        return save(request, instance_id)
    instance = AppInstance.objects.get(pk=instance_id)
    context.update(instance=instance)
    # convert keywords list into json string &
    # use mark_safe to remove the trailing slash "keyword/"
    context.update(keywords=mark_safe(json.dumps(instance.keyword_list())))
    import requests

    # get all permissions for an instance-id
    url = "http://" + request.get_host() + "/security/permissions/" + instance_id
    headers = {
        'cache-control': "no-cache",
        'postman-token': "5d96d9c2-f995-9301-47e4-8bd24104b52f",
    }
    response = requests.request("GET", url, headers=headers)
    print "!!", response.text

    # check the user permissions | check user can edit or not
    # try:
    #     if json.loads(response.text)['success'] == True:
    #         permissions = json.loads(response.text)['permissions']
    #         users = json.loads(permissions)['users']
    # except:
    #     return HttpResponse("You don't have permission to edit!!")
    return render(request, template, context)


def view_app(request, instance_id, template="%s/view.html" % APP_NAME, context={}):
    instance = _resolve_appinstance(
        request, instance_id, 'base.view_resourcebase', _PERMISSION_MSG_VIEW)
    context.update({
        "map_config": instance.map.viewer_json(request.user, None),
        "instance": instance
    })
    return render(request, template, context)
