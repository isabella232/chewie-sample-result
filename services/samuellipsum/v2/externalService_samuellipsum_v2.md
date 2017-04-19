





<div class="notebook" id="staticInteractiveexternalService_samuellipsum_v2">

  <div class="notebook__static-tutorial" data-tutorial="externalService_samuellipsum_v2" data-is-quick-setup="true" data-link="https://yaas.github.io/chewie-sample-result/build/embedded.html#externalService_samuellipsum_v2">
   
   
   <h3 id="get-access-token">Get access token</h3>
<p>To perform any operations with specific service, you always need an access token. For this purpose create an API Client for oAuth2 service.</p>
<pre class="highlight"><code class="hljs javascript">API.createClient(<span class="hljs-string">'oAuth2Service'</span>,
<span class="hljs-string">'https://devportal.yaas.io/services/oauth2/b1/api.raml'</span>);
</code></pre>
<p>Now get the token:</p>
<pre class="highlight"><code class="hljs javascript">AccessToken = oAuth2Service.token.post({
  <span class="hljs-string">'client_id'</span> : <span class="hljs-string">'en7kp4cbjgA2TuuihU3MxCEShMx5xaEF'</span>,
  <span class="hljs-string">'client_secret'</span>:<span class="hljs-string">'63gNfrpSnQWKQXEO'</span>,
  <span class="hljs-string">'grant_type'</span> : <span class="hljs-string">'client_credentials'</span>,
    <span class="hljs-string">'token_type'</span>: <span class="hljs-string">'Bearer'</span>,
  <span class="hljs-string">'scope'</span>: <span class="hljs-string">'hybris.tenant hybris.document_manage hybris.document_view'</span>
});
</code></pre>
<p>To make calls simpler and code cleaner, assign Id of returned object to a variable.</p>
<pre class="highlight"><code class="hljs javascript">access_token = AccessToken.body.access_token;
</code></pre>
<h3 id="create-api-client-for-document-service">Create API client for Document service</h3>
<pre class="highlight"><code class="hljs javascript">API.createClient(<span class="hljs-string">'documentService'</span>,
<span class="hljs-string">'https://devportal.yaas.io/services/document/b2/api.raml'</span>);
</code></pre>
<h3 id="create-a-simple-object">Create a simple object</h3>
<pre class="highlight"><code class="hljs javascript">comic_obj = documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).post({
<span class="hljs-string">'kind'</span>: <span class="hljs-string">'History'</span>,
<span class="hljs-string">'name'</span>: <span class="hljs-string">'Thorgal'</span>
}, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<p>To make calls simpler and code cleaner, assign Id of returned object to a variable.</p>
<pre class="highlight"><code class="hljs javascript">id = comic_obj.body.id;
</code></pre>
<h3 id="retrieve-object-created-with-the-previous-step">Retrieve object created with the previous step</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).get(<span class="hljs-literal">null</span>, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<h3 id="update-an-object-with-additional-information">Update an object with additional information</h3>
<p>Perform a partial update on the object:</p>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).put({
 <span class="hljs-string">'title'</span>: <span class="hljs-string">'Child of the Stars'</span>
}, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
  },
  query: {
      <span class="hljs-string">'partial'</span> : <span class="hljs-literal">true</span>
  }
})
</code></pre>
<h3 id="retrieve-the-same-object-to-ensure-that-proper-information-is-updated">Retrieve the same object to ensure that proper information is updated</h3>
<p>Get the object to make sure that it was updated. You can be sure it was as the <strong>modifiedAt</strong> date is also updated.</p>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).get(<span class="hljs-literal">null</span>, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<h3 id="update-entire-object-with-new-information">Update entire object with new information</h3>
<p>Now perform full update of the object:</p>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).put({
  <span class="hljs-string">'name'</span>: <span class="hljs-string">'Thorgal'</span>,
  <span class="hljs-string">'title'</span>: <span class="hljs-string">'The Brand of the Exiles'</span>,
  <span class="hljs-string">'kind'</span>: <span class="hljs-string">'History'</span>
}, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
  }
})
</code></pre>
<h3 id="retrieve-the-same-object-to-ensure-proper-information-is-replaced">Retrieve the same object to ensure proper information is replaced</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).get(<span class="hljs-literal">null</span>, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<h3 id="remove-a-single-attribute-from-an-object">Remove a single attribute from an object</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).attributeName(<span class="hljs-string">'name'</span>).delete(<span class="hljs-literal">null</span>, {
    headers: {
   <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
  }
})
</code></pre>
<h3 id="remove-an-entire-object">Remove an Entire Object</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).delete(<span class="hljs-literal">null</span>, {
    headers: {
   <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
  }
})
</code></pre>
<h3 id="retrieve-a-deleted-object-to-ensure-it-is-really-deleted">Retrieve a deleted object to ensure it is really deleted</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(id).get(<span class="hljs-literal">null</span>, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<h3 id="create-a-simple-object-with-the-custom-id">Create a simple object with the custom ID</h3>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(<span class="hljs-string">'sampleId'</span>).post({
<span class="hljs-string">"kind"</span>: <span class="hljs-string">"History"</span>,
<span class="hljs-string">"name"</span>: <span class="hljs-string">"Thorgal"</span>
}, {
  headers: {
    <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + AccessToken.body.access_token,
    <span class="hljs-string">'Content-type'</span> : <span class="hljs-string">'application/json'</span>
           }
        }
  )
</code></pre>
<pre class="highlight"><code class="hljs javascript">documentService.tenant(<span class="hljs-string">'itutorials'</span>).client(<span class="hljs-string">'hybris.itutorials'</span>).data.type(<span class="hljs-string">'comic'</span>).dataId(<span class="hljs-string">'sampleId'</span>).delete(<span class="hljs-literal">null</span>, {
    headers: {
   <span class="hljs-string">'Authorization'</span>: <span class="hljs-string">'Bearer '</span> + access_token,
  }
})
</code></pre>

  </div>

  <div id="notebookexternalService_samuellipsum_v2">
    <iframe style="min-height: 430px;" class="notebook__interactive-tutorial u-transition-all width-100 interactive-tutorial" src="" scrolling="no" frameBorder="0" id="externalService_samuellipsum_v2"></iframe>
  </div>

  <div class="notebook__loader">

  </div>

</div> <!-- ---
---
id: externalService_samuellipsum_v2
title: 'Perform Simple CRUD Operations'
type: 'Tutorial'
service: 'Samuel L Ipsum'
interactive: true
order: 40
---

### Get access token

To perform any operations with specific service, you always need an access token. For this purpose create an API Client for oAuth2 service.

```javascript
API.createClient('oAuth2Service',
'https://devportal.yaas.io/services/oauth2/b1/api.raml');
```

Now get the token:

```javascript
AccessToken = oAuth2Service.token.post({
  'client_id' : 'en7kp4cbjgA2TuuihU3MxCEShMx5xaEF',
  'client_secret':'63gNfrpSnQWKQXEO',
  'grant_type' : 'client_credentials',
    'token_type': 'Bearer',
  'scope': 'hybris.tenant hybris.document_manage hybris.document_view'
});
```

To make calls simpler and code cleaner, assign Id of returned object to a variable.

```javascript
access_token = AccessToken.body.access_token;
```

### Create API client for Document service


```javascript
API.createClient('documentService',
'https://devportal.yaas.io/services/document/b2/api.raml');
```

### Create a simple object


```javascript
comic_obj = documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').post({
'kind': 'History',
'name': 'Thorgal'
}, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

To make calls simpler and code cleaner, assign Id of returned object to a variable.


```javascript
id = comic_obj.body.id;
```

### Retrieve object created with the previous step


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).get(null, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

### Update an object with additional information

Perform a partial update on the object:

```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).put({
 'title': 'Child of the Stars'
}, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
  },
  query: {
  	'partial' : true
  }
})
```

### Retrieve the same object to ensure that proper information is updated


Get the object to make sure that it was updated. You can be sure it was as the **modifiedAt** date is also updated.


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).get(null, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

### Update entire object with new information

Now perform full update of the object:

```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).put({
  'name': 'Thorgal',
  'title': 'The Brand of the Exiles',
  'kind': 'History'
}, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
  }
})
```

### Retrieve the same object to ensure proper information is replaced


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).get(null, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

### Remove a single attribute from an object


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).attributeName('name').delete(null, {
	headers: {
   'Authorization': 'Bearer ' + access_token,
  }
})
```

### Remove an Entire Object


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).delete(null, {
	headers: {
   'Authorization': 'Bearer ' + access_token,
  }
})
```

### Retrieve a deleted object to ensure it is really deleted


```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId(id).get(null, {
  headers: {
    'Authorization': 'Bearer ' + access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

### Create a simple object with the custom ID



```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId('sampleId').post({
"kind": "History",
"name": "Thorgal"
}, {
  headers: {
    'Authorization': 'Bearer ' + AccessToken.body.access_token,
    'Content-type' : 'application/json'
           }
		}
  )
```

```javascript
documentService.tenant('itutorials').client('hybris.itutorials').data.type('comic').dataId('sampleId').delete(null, {
	headers: {
   'Authorization': 'Bearer ' + access_token,
  }
})
```
 -->