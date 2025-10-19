<?php

use App\Models\User;
use Illuminate\Support\Facades\Hash;

// Test admin user
$email = 'admin@tgi.fr';
$password = 'password';

$user = User::where('email', $email)->first();

if (!$user) {
    echo "❌ User not found: {$email}\n";
    exit(1);
}

echo "✅ User found:\n";
echo "   ID: {$user->id}\n";
echo "   Name: {$user->name}\n";
echo "   Email: {$user->email}\n";
echo "   Password Hash: " . substr($user->password, 0, 30) . "...\n";
echo "\n";

// Test password
if (Hash::check($password, $user->password)) {
    echo "✅ Password 'password' is CORRECT!\n";
} else {
    echo "❌ Password 'password' is INCORRECT!\n";
    echo "   The password hash might be corrupted.\n";
    echo "   Run: php artisan db:seed --class=RolesAndPermissionsSeeder\n";
}

// Show all users
echo "\n";
echo "📋 All users in database:\n";
$users = User::all();
foreach ($users as $u) {
    echo "   • {$u->name} ({$u->email})\n";
}
