import os.path


class Database:
    def __init__(self):
        self.file = 'info.txt'
        self.enable_service = 'false'

    def get_service_state(self):
        self._get_service_state()
        return self.enable_service

    def _get_service_state(self):
        check_file = os.path.exists(self.file)
        if check_file:
            get_info = open(self.file, 'r')
            self.enable_service = get_info.read()
            get_info.close()
        else:
            get_info = open(self.file, 'w')
            get_info.write(self.enable_service)
            get_info.close()

    def set_service_state(self, enable_service):
        self._set_service_state(enable_service)

    def _set_service_state(self, enable_service):
        set_info = open(self.file, 'w')
        set_info.write(str(enable_service))
        set_info.close()
