from subprocess import Popen, PIPE
from control.config import SUDO_PASSWORD
from control import models


class Daemon:
    def __init__(self):
        self.name = 'apache2'
        self.sudo_password = SUDO_PASSWORD

    def command_daemon(self, command):
        args = ['sudo', '-S', 'systemctl', command, self.name]
        process = Popen(args, stdin=PIPE, stderr=PIPE, universal_newlines=True)
        process.communicate(self.sudo_password)
        status = process.wait()
        return status

    def info(self):
        service_state = self.check_daemon()
        enable_service = models.Database().get_service_state()
        data = {
            'name': self.name,
            'service_state': service_state,
            'enable_service': enable_service
        }
        return data

    def check_daemon(self):
        check = self.command_daemon(command='status')
        if check == 0:
            service_state = 'Сервис работает'
        elif check == 3:
            service_state = 'Сервис остановлен'
        else:
            service_state = 'Ошибка сервиса'
        return service_state



