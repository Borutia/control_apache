from rest_framework.views import APIView
from rest_framework.response import Response
from control import daemon, models


class Control_service(APIView):
    def get(self, request):
        data = daemon.Daemon().info()
        return Response(data)

    def post(self, request):
        daemon.Daemon().command_daemon(command=request.POST['control_daemon'])
        models.Database().set_service_state(request.POST['enable_service'])
        data = daemon.Daemon().info()
        return Response(data)

