<?php

require_once(SHARED . '/lib/axr/config.php');

Config::set('/shared/rsrc/prod', true);

Config::set('/shared/rsrc_url', 'http://static.axr.vg/prod-2');
Config::set('/shared/www_url', 'http://axr.vg');
Config::set('/shared/wiki_url', 'http://axr.vg/wiki');
Config::set('/shared/files_url', 'http://files.axr.vg');
Config::set('/shared/files_path', '/var/dev/files');

/**
 * Reccommended development values. You can put them in config.user.php
 *

Config::set('/shared/rsrc/prod', false);

$localhost = 'http://localhost';
Config::set('/shared/rsrc_url', $localhost . '/static);
Config::set('/shared/www_url', $localhost;
Config::set('/shared/wiki_url', $localhost . '/wiki');

 */
if (file_exists(SHARED . '/config.user.php'))
{
	require_once(SHARED . '/config.user.php');
}

