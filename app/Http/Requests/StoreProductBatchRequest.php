<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreProductBatchRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
            'image_cnt' => 'required|integer|min:1|max:10',
            'sales_deadline' => 'nullable|date|after:today',
            'sales_limit' => 'nullable|integer|min:1',
            'price' => 'required|numeric|min:0|max:999999.99',
            'display_mode' => 'required|in:normal,gacha,blur,password,cushion',
            'add_category' => 'required|boolean',
            'category_ids' => 'nullable|string', // JSON string of category IDs
            'sn_print' => 'required|boolean',
            'sn_format' => 'required_if:sn_print,true|in:number,random',
            'is_public' => 'required|boolean',
            'password' => 'required_if:display_mode,password|nullable|string|min:6|max:50',
            'files' => 'nullable|array|max:10',
            'files.*' => 'file|mimes:jpg,jpeg,png,pdf|max:25600', // 25MB per file
        ];
    }

    /**
     * Get custom error messages for validation rules.
     */
    public function messages(): array
    {
        return [
            'title.required' => '商品タイトルは必須です。',
            'title.max' => '商品タイトルは255文字以内で入力してください。',
            'description.max' => '商品説明は1000文字以内で入力してください。',
            'image_cnt.required' => '画像枚数は必須です。',
            'image_cnt.min' => '画像は最低1枚必要です。',
            'image_cnt.max' => '画像は10枚までアップロードできます。',
            'sales_deadline.after' => '販売期限の日付は翌日以降の日付を指定してください。',
            'sales_limit.min' => '販売数は1以上を入力してください。',
            'price.required' => '価格は必須です。',
            'price.min' => '価格は0円以上で入力してください。',
            'price.max' => '価格は999,999円以下で入力してください。',
            'display_mode.required' => '表示設定は必須です。',
            'display_mode.in' => '無効な表示設定です。',
            'sn_format.required_if' => 'シリアル番号印字を選択した場合、印字形式を選択してください。',
            'sn_format.in' => '無効なシリアル番号印字形式です。',
            'password.required_if' => 'パスワード設定を選択した場合、パスワードを入力してください。',
            'password.min' => 'パスワードは6文字以上で入力してください。',
            'password.max' => 'パスワードは50文字以内で入力してください。',
        ];
    }
}
